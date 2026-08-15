# Tapir Skills

[![skills.sh](https://skills.sh/b/SuperTapir/tapir-skills)](https://skills.sh/SuperTapir/tapir-skills)

[English](./README.md) | [中文](./README.zh-CN.md)

Opinionated skills for engineering judgment, app-icon craft, presentation
design and authoring, video inspection, Chinese writing, and CadenzaOS Launcher
Cover creation. They encode the working preferences I use with AI agents:
confirm the root cause, make trade-offs explicit, build one strong visual
relationship, and verify the result through a real workflow.

## Installation

Install all skills:

```bash
npx skills@latest add SuperTapir/tapir-skills
```

Install one skill:

```bash
npx skills@latest add SuperTapir/tapir-skills --skill tapir-craft
npx skills@latest add SuperTapir/tapir-skills --skill tapir-icon-craft
npx skills@latest add SuperTapir/tapir-skills --skill tapir-presentation-craft
npx skills@latest add SuperTapir/tapir-skills --skill cadenza-presentations
npx skills@latest add SuperTapir/tapir-skills --skill inspect-video-frames
npx skills@latest add SuperTapir/tapir-skills --skill tapir-writing-voice
npx skills@latest add SuperTapir/tapir-skills --skill generate-launcher-cover-art
```

`cadenza-presentations` contains the Agent workflow, not the CadenzaSlide
runtime. Install the runtime separately by following the
[CadenzaSlide source installation](https://github.com/SuperTapir/CadenzaSlide#install-from-source)
and confirm that `cadenza --help` works before using the Skill.

## Skills

- **[tapir-craft](./skills/tapir-craft/SKILL.md)** — Minimal correct
  implementations, root-cause-first debugging, explicit trade-offs, and
  autonomous verification. Its minimal-solution ladder is adapted from
  [Ponytail](https://github.com/DietrichGebert/ponytail).
- **[tapir-icon-craft](./skills/tapir-icon-craft/SKILL.md)** — Story-driven app
  icon and logo art direction with strong hierarchy and small-size clarity.
- **[tapir-presentation-craft](./skills/tapir-presentation-craft/SKILL.md)** —
  Concise, imageable, speaker-led presentations with decisive motion and a
  reusable source-first system.
- **[cadenza-presentations](./skills/cadenza-presentations/SKILL.md)** — Create,
  revise, verify, preview, and present decks through the CadenzaSlide runtime
  and its portable workspace format. Requires the separately installed
  `cadenza` CLI.
- **[inspect-video-frames](./skills/inspect-video-frames/SKILL.md)** — Staged
  FFmpeg video inspection with metadata probes, timestamped overview sheets,
  targeted high-FPS detail extraction, and explicit every-frame export.
- **[tapir-writing-voice](./skills/tapir-writing-voice/SKILL.md)** — Draft,
  rewrite, and review Chinese writing in Tapir's established voice while
  preserving real experience, practical evidence, engineering judgment, and
  restrained conversational language.
- **[generate-launcher-cover-art](./skills/generate-launcher-cover-art/SKILL.md)**
  — A gated workflow for creating illustrated, readable, and verified 1-bit
  CadenzaOS Launcher Covers.

Each skill is a portable directory with a `SKILL.md` file at its root. Some
skills also include references, scripts, examples, and agent-specific metadata.
Except for `tapir-craft`, these skills require explicit invocation with their
`$skill-name`.

## License

MIT. The bundled Lucide runtime retains its own license notice.
