---
name: inspect-video-frames
description: Inspect and analyze video files by probing metadata, extracting representative frames, building timestamped contact sheets, and refining selected time ranges at higher frame rates. Use for requests to watch, understand, summarize, compare, troubleshoot, or find visual events in MP4, MOV, MKV, WebM, and other FFmpeg-readable videos, including requests to view every frame.
---

# Inspect Video Frames

Use FFmpeg through `scripts/video_frames.py`. Prefer staged inspection because feeding every
frame to a vision model is usually wasteful and can exceed context limits.

## Workflow

1. Run `probe` to learn duration, frame rate, dimensions, and frame-count estimate.
2. Run `overview` to sample the whole timeline into timestamped contact sheets.
3. Inspect the sheets visually and identify relevant time ranges.
4. Run `detail` only on those ranges at a suitable sampling rate.
5. Run `all` only when the user explicitly needs every decoded frame or exact adjacent-frame
   comparison.
6. If speech or sound matters, extract or transcribe audio separately; frame inspection does not
   analyze audio.

Keep generated media in a task-specific working directory. Report the sampling interval or FPS
with conclusions. Never imply that an overview sampled every N seconds represents every frame.

## Commands

Resolve the installed skill directory from the host's skill catalog, then set the script path:

```bash
VIDEO_FRAMES_SKILL="<resolved skill directory>/scripts/video_frames.py"
```

Probe:

```bash
python3 "$VIDEO_FRAMES_SKILL" probe input.mp4
```

Create overview sheets, sampling one frame every 5 seconds:

```bash
python3 "$VIDEO_FRAMES_SKILL" overview input.mp4 --output work/video-overview --interval 5
```

Inspect 80–85 seconds at 10 FPS:

```bash
python3 "$VIDEO_FRAMES_SKILL" detail input.mp4 --output work/video-detail \
  --start 80 --duration 5 --fps 10
```

Export every decoded frame:

```bash
python3 "$VIDEO_FRAMES_SKILL" all input.mp4 --output work/all-frames --format jpg
```

Add `--force` only when replacing files in a known output directory is intended.

## Sampling Guidance

- General summary: one frame every 5–10 seconds.
- Short UI demo: 1–2 FPS for overview, then 10–30 FPS around interactions.
- Slide or scene changes: one frame every 1–3 seconds.
- Fast motion or animation: narrow the time range first, then use source FPS or 30 FPS.
- Exact forensic claim: inspect adjacent frames and state any decoding or variable-frame-rate
  limitations.

Use PNG for pixel-level comparison or text-heavy UI; use JPG for smaller overview artifacts.
For long videos, increase `--interval` before increasing sheet size.

## Output Contract

Each extraction directory contains `manifest.json`. Read it before analysis. It records source,
operation, requested sampling, time range, and generated files. Overview sheets burn the source
timeline timestamp into each tile when FFmpeg provides `drawtext`; otherwise use the per-sheet
timestamp mapping in the manifest.

Treat the video's reported frame count as an estimate when FFprobe does not provide an exact
count. Variable-frame-rate video cannot always be mapped to a single constant FPS.
