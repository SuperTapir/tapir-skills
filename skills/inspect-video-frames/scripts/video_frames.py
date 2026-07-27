#!/usr/bin/env python3
"""Probe videos and extract overview, detail, or all decoded frames with FFmpeg."""

from __future__ import annotations

import argparse
import json
import math
import shutil
import subprocess
import sys
from fractions import Fraction
from pathlib import Path


def require_tools() -> None:
    missing = [tool for tool in ("ffmpeg", "ffprobe") if shutil.which(tool) is None]
    if missing:
        raise SystemExit(f"Missing required command(s): {', '.join(missing)}")


def run(command: list[str], *, capture: bool = False) -> str:
    result = subprocess.run(
        command,
        check=True,
        text=True,
        stdout=subprocess.PIPE if capture else None,
    )
    return result.stdout if capture else ""


def probe(video: Path) -> dict:
    raw = run(
        [
            "ffprobe",
            "-v",
            "error",
            "-select_streams",
            "v:0",
            "-show_entries",
            "format=duration,format_name,size:stream=index,codec_name,width,height,"
            "avg_frame_rate,r_frame_rate,nb_frames,duration,pix_fmt",
            "-of",
            "json",
            str(video),
        ],
        capture=True,
    )
    data = json.loads(raw)
    streams = data.get("streams", [])
    if not streams:
        raise SystemExit(f"No video stream found: {video}")
    stream = streams[0]
    format_data = data.get("format", {})
    duration = float(stream.get("duration") or format_data.get("duration") or 0)
    rate_text = stream.get("avg_frame_rate") or stream.get("r_frame_rate") or "0/1"
    try:
        fps = float(Fraction(rate_text))
    except (ValueError, ZeroDivisionError):
        fps = 0
    exact_frames = stream.get("nb_frames")
    estimated_frames = int(round(duration * fps)) if duration and fps else None
    return {
        "source": str(video.resolve()),
        "format": format_data.get("format_name"),
        "size_bytes": int(format_data["size"]) if format_data.get("size") else None,
        "duration_seconds": duration,
        "codec": stream.get("codec_name"),
        "width": stream.get("width"),
        "height": stream.get("height"),
        "pixel_format": stream.get("pix_fmt"),
        "average_frame_rate": rate_text,
        "fps_decimal": fps,
        "exact_frame_count": int(exact_frames) if exact_frames else None,
        "estimated_frame_count": estimated_frames,
    }


def prepare_output(path: Path, force: bool) -> None:
    if path.exists() and any(path.iterdir()) and not force:
        raise SystemExit(f"Output directory is not empty: {path} (use --force to replace)")
    path.mkdir(parents=True, exist_ok=True)
    if force:
        for child in path.iterdir():
            if child.is_file() or child.is_symlink():
                child.unlink()
            elif child.is_dir():
                shutil.rmtree(child)


def write_manifest(output: Path, payload: dict) -> None:
    (output / "manifest.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def output_files(output: Path, pattern: str) -> list[str]:
    return [item.name for item in sorted(output.glob(pattern))]


def ffmpeg_has_filter(name: str) -> bool:
    result = subprocess.run(
        ["ffmpeg", "-hide_banner", "-filters"],
        check=True,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    return any(line.split()[1:2] == [name] for line in result.stdout.splitlines())


def do_overview(args: argparse.Namespace, info: dict) -> None:
    output = Path(args.output).expanduser().resolve()
    prepare_output(output, args.force)
    tile_count = args.columns * args.rows
    font_size = max(14, round(args.width / 18))
    timestamp_overlay = ffmpeg_has_filter("drawtext")
    filters = [f"fps=1/{args.interval}", f"scale={args.width}:-2"]
    if timestamp_overlay:
        filters.append(
            f"drawtext=text='%{{pts\\:hms}}':x=8:y=h-th-8:fontsize={font_size}:"
            "fontcolor=white:box=1:boxcolor=black@0.65"
        )
    filters.append(
        f"tile={args.columns}x{args.rows}:nb_frames={tile_count}:padding=6:margin=6"
    )
    vf = ",".join(filters)
    run(
        [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-i",
            str(args.video),
            "-vf",
            vf,
            "-fps_mode",
            "vfr",
            "-q:v",
            "2",
            str(output / "sheet_%03d.jpg"),
        ]
    )
    files = output_files(output, "sheet_*.jpg")
    sampled_count = (
        math.ceil(info["duration_seconds"] / args.interval)
        if info["duration_seconds"]
        else len(files) * tile_count
    )
    sheet_timeline = []
    for sheet_index, filename in enumerate(files):
        first_sample = sheet_index * tile_count
        valid_tiles = max(0, min(tile_count, sampled_count - first_sample))
        sheet_timeline.append(
            {
                "file": filename,
                "first_tile_seconds": first_sample * args.interval,
                "tile_step_seconds": args.interval,
                "valid_tiles": valid_tiles,
                "tile_order": "left-to-right, top-to-bottom",
            }
        )
    manifest = {
        **info,
        "operation": "overview",
        "sample_interval_seconds": args.interval,
        "sheet_layout": {"columns": args.columns, "rows": args.rows},
        "tile_width_pixels": args.width,
        "sampled_frame_estimate": sampled_count,
        "timestamps_burned_into_tiles": timestamp_overlay,
        "sheet_timeline": sheet_timeline,
        "generated_files": files,
    }
    write_manifest(output, manifest)
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


def do_detail(args: argparse.Namespace, info: dict) -> None:
    output = Path(args.output).expanduser().resolve()
    prepare_output(output, args.force)
    extension = args.format
    command = ["ffmpeg", "-hide_banner", "-loglevel", "warning", "-ss", str(args.start)]
    command += ["-i", str(args.video), "-t", str(args.duration), "-vf", f"fps={args.fps}"]
    if extension == "jpg":
        command += ["-q:v", "2"]
    command += [str(output / f"frame_%06d.{extension}")]
    run(command)
    files = output_files(output, f"frame_*.{extension}")
    manifest = {
        **info,
        "operation": "detail",
        "start_seconds": args.start,
        "duration_seconds_requested": args.duration,
        "sample_fps": args.fps,
        "frame_time_formula": "start_seconds + (frame_number - 1) / sample_fps",
        "generated_frame_count": len(files),
        "generated_file_pattern": f"frame_%06d.{extension}",
        "first_generated_file": files[0] if files else None,
        "last_generated_file": files[-1] if files else None,
    }
    write_manifest(output, manifest)
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


def do_all(args: argparse.Namespace, info: dict) -> None:
    output = Path(args.output).expanduser().resolve()
    prepare_output(output, args.force)
    extension = args.format
    command = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel",
        "warning",
        "-i",
        str(args.video),
        "-map",
        "0:v:0",
        "-fps_mode",
        "passthrough",
    ]
    if extension == "jpg":
        command += ["-q:v", "2"]
    command += [str(output / f"frame_%08d.{extension}")]
    run(command)
    files = output_files(output, f"frame_*.{extension}")
    manifest = {
        **info,
        "operation": "all",
        "image_format": extension,
        "generated_frame_count": len(files),
        "generated_file_pattern": f"frame_%08d.{extension}",
        "first_generated_file": files[0] if files else None,
        "last_generated_file": files[-1] if files else None,
    }
    write_manifest(output, manifest)
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


def positive(value: str) -> float:
    number = float(value)
    if number <= 0:
        raise argparse.ArgumentTypeError("must be greater than zero")
    return number


def parser() -> argparse.ArgumentParser:
    root = argparse.ArgumentParser(description=__doc__)
    sub = root.add_subparsers(dest="operation", required=True)

    probe_parser = sub.add_parser("probe", help="Print video metadata as JSON")
    probe_parser.add_argument("video", type=Path)

    overview = sub.add_parser("overview", help="Create timestamped contact sheets")
    overview.add_argument("video", type=Path)
    overview.add_argument("--output", required=True)
    overview.add_argument("--interval", type=positive, default=5.0)
    overview.add_argument("--columns", type=int, default=5)
    overview.add_argument("--rows", type=int, default=4)
    overview.add_argument("--width", type=int, default=320)
    overview.add_argument("--force", action="store_true")

    detail = sub.add_parser("detail", help="Sample a selected time range")
    detail.add_argument("video", type=Path)
    detail.add_argument("--output", required=True)
    detail.add_argument("--start", type=float, required=True)
    detail.add_argument("--duration", type=positive, required=True)
    detail.add_argument("--fps", type=positive, default=10.0)
    detail.add_argument("--format", choices=("jpg", "png"), default="jpg")
    detail.add_argument("--force", action="store_true")

    all_frames = sub.add_parser("all", help="Export every decoded frame")
    all_frames.add_argument("video", type=Path)
    all_frames.add_argument("--output", required=True)
    all_frames.add_argument("--format", choices=("jpg", "png"), default="jpg")
    all_frames.add_argument("--force", action="store_true")
    return root


def main() -> None:
    args = parser().parse_args()
    require_tools()
    args.video = args.video.expanduser().resolve()
    if not args.video.is_file():
        raise SystemExit(f"Video does not exist: {args.video}")
    info = probe(args.video)
    if args.operation == "probe":
        print(json.dumps(info, ensure_ascii=False, indent=2))
    elif args.operation == "overview":
        do_overview(args, info)
    elif args.operation == "detail":
        do_detail(args, info)
    elif args.operation == "all":
        do_all(args, info)


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as error:
        sys.exit(error.returncode)
