# Tapir Skills

[![skills.sh](https://skills.sh/b/SuperTapir/tapir-skills)](https://skills.sh/SuperTapir/tapir-skills)

Opinionated skills for engineering judgment, app-icon craft, presentation
design, video inspection, Chinese writing, and CadenzaOS Launcher Cover
creation. They encode the working preferences I use with AI agents: confirm the
root cause, make trade-offs explicit, build one strong visual relationship, and
verify the result through a real workflow.

## Install

Install all skills:

```bash
npx skills@latest add SuperTapir/tapir-skills
```

Install one skill:

```bash
npx skills@latest add SuperTapir/tapir-skills --skill tapir-craft
npx skills@latest add SuperTapir/tapir-skills --skill tapir-icon-craft
npx skills@latest add SuperTapir/tapir-skills --skill tapir-presentation-craft
npx skills@latest add SuperTapir/tapir-skills --skill inspect-video-frames
npx skills@latest add SuperTapir/tapir-skills --skill tapir-writing-voice
npx skills@latest add SuperTapir/tapir-skills --skill generate-launcher-cover-art
```

## Skills

- **[tapir-craft](./skills/tapir-craft/SKILL.md)** — Root-cause-first
  debugging, explicit trade-offs, testable failure cases, and autonomous
  verification.
- **[tapir-icon-craft](./skills/tapir-icon-craft/SKILL.md)** — Story-driven
  app-icon and logo art direction with strong hierarchy and small-size clarity.
- **[tapir-presentation-craft](./skills/tapir-presentation-craft/SKILL.md)** —
  Concise, imageable, speaker-led presentations with decisive motion and a
  reusable source-first system.
- **[inspect-video-frames](./skills/inspect-video-frames/SKILL.md)** — Staged
  FFmpeg video inspection with metadata probes, timestamped overview sheets,
  targeted high-FPS detail extraction, and explicit every-frame export.
- **[tapir-writing-voice](./skills/tapir-writing-voice/SKILL.md)** — 按 Tapir
  已形成的中文写作声音起草、改写和审阅文章，保留真实经历、实践证据、
  工程判断和克制口语，并在交付前检查 AI 腔与证据边界。
- **[generate-launcher-cover-art](./skills/generate-launcher-cover-art/SKILL.md)**
  — A gated workflow for creating illustrated, readable, and verified 1-bit
  CadenzaOS Launcher Covers.

Each skill is a portable directory with a `SKILL.md` file at its root. Some
skills also include references, scripts, examples, and agent-specific metadata.
Except for `tapir-craft`, these skills require explicit invocation with their
`$skill-name`.

## License

MIT. The bundled Lucide runtime retains its own license notice.
