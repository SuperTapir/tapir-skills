# Tapir Skills

[![skills.sh](https://skills.sh/b/SuperTapir/tapir-skills)](https://skills.sh/SuperTapir/tapir-skills)

[English](#english) | [中文](#中文)

## English

Opinionated skills for engineering judgment, app-icon craft, presentation
design and authoring, video inspection, Chinese writing, and CadenzaOS Launcher
Cover creation. They encode the working preferences I use with AI agents:
confirm the root cause, make trade-offs explicit, build one strong visual
relationship, and verify the result through a real workflow.

### Installation

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

### Skills

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
  and its portable workspace format.
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

### License

MIT. The bundled Lucide runtime retains its own license notice.

## 中文

一组带有明确取舍和个人偏好的 Agent Skills，覆盖工程判断、应用图标设计、
演示设计与制作、视频逐帧检查、中文写作和 CadenzaOS Launcher Cover 生成。
它们沉淀了我与 AI Agent 协作时采用的方法：先确认根因，明确方案取舍，建立一个
有力的视觉关系，并通过真实流程验证最终结果。

### 安装

安装全部 Skills：

```bash
npx skills@latest add SuperTapir/tapir-skills
```

安装单个 Skill：

```bash
npx skills@latest add SuperTapir/tapir-skills --skill tapir-craft
npx skills@latest add SuperTapir/tapir-skills --skill tapir-icon-craft
npx skills@latest add SuperTapir/tapir-skills --skill tapir-presentation-craft
npx skills@latest add SuperTapir/tapir-skills --skill cadenza-presentations
npx skills@latest add SuperTapir/tapir-skills --skill inspect-video-frames
npx skills@latest add SuperTapir/tapir-skills --skill tapir-writing-voice
npx skills@latest add SuperTapir/tapir-skills --skill generate-launcher-cover-art
```

### Skills

- **[tapir-craft](./skills/tapir-craft/SKILL.md)** — 以最小正确实现、根因优先、
  明确 trade-off 和自主验证为核心的工程方法。最小方案阶梯改编自
  [Ponytail](https://github.com/DietrichGebert/ponytail)。
- **[tapir-icon-craft](./skills/tapir-icon-craft/SKILL.md)** — 以故事、层级和小尺寸
  识别度为核心的应用图标与 Logo 设计指导。
- **[tapir-presentation-craft](./skills/tapir-presentation-craft/SKILL.md)** — 制作简洁、
  有力、可演讲的视觉叙事，并强调明确动效与可复用的 source-first 系统。
- **[cadenza-presentations](./skills/cadenza-presentations/SKILL.md)** — 通过
  CadenzaSlide runtime 和可迁移 workspace 格式创建、修改、验证、预览与播放演示。
- **[inspect-video-frames](./skills/inspect-video-frames/SKILL.md)** — 分阶段执行 FFmpeg
  视频检查，包括元数据探测、带时间戳的总览图、局部高帧率提取和逐帧导出。
- **[tapir-writing-voice](./skills/tapir-writing-voice/SKILL.md)** — 按 Tapir 已形成的
  中文写作声音起草、改写和审阅文章，保留真实经历、实践证据、工程判断和克制口语。
- **[generate-launcher-cover-art](./skills/generate-launcher-cover-art/SKILL.md)** —
  通过分阶段门禁生成具有插画感、可读性且经过验证的 1-bit CadenzaOS Launcher
  Cover。

每个 Skill 都是一个可移植目录，根目录包含 `SKILL.md`。部分 Skills 还会包含
references、scripts、examples 和 Agent 专用元数据。除 `tapir-craft` 外，其他 Skills
默认需要使用各自的 `$skill-name` 显式调用。

### 许可证

MIT。仓库内附带的 Lucide runtime 保留其自身的许可证声明。
