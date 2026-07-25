# Reusable presentation system

Read this reference when building or extending a reusable HTML or PPTX
presentation system.

## Format routing contract

Use Slidev HTML as the default artifact for an unspecified presentation,
slides, deck, or “PPT” creation request. “PPT” alone describes the presentation
genre; it does not imply `.pptx`.

Route to a native artifact only when the request explicitly names `.pptx`,
PowerPoint, `.key`, Keynote, Google Slides, or another concrete target. Presenter
mode, notes, synchronized windows, and speaker-controlled animation are positive
signals for Slidev.

For the default Slidev delivery, include:

- editable `slides.md` and deck-specific styles;
- local assets and icon collections required at build time;
- a production `dist/`;
- a small SPA-fallback server or launcher so deep links work;
- documented audience and `/presenter/` URLs.

Use these routing examples as regression cases:

| Request | Required artifact |
| --- | --- |
| “制作一个演示，讲解 Flipper Zero 是干啥的” | Slidev HTML |
| “做一个 9 页 PPT，讲这个产品” | Slidev HTML |
| “生成一个可以编辑的 PPTX 文件” | Native `.pptx` |
| “按照这个 Keynote 文件继续做” | Native Keynote workflow |
| “放进 Google Slides” | Google Slides workflow |

## Stability model

Do not regenerate the complete presentation implementation for every deck.
Separate stable infrastructure from content-specific composition:

1. **Runtime** — canvas, scaling, navigation, lifecycle, reduced motion.
2. **Tokens** — palette, typography, spacing, stroke, timing.
3. **Page roles** — cover, intro, agenda, section, evidence, summary, Q&A.
4. **Visual patterns** — cut, pass, land, focus, accumulate, unfold, lock,
   replace.
5. **Deck source** — claims, content, assets, role and pattern selection.
6. **Validation** — structural, geometric, rendered and motion checks.

Keep roughly 70% of the implementation stable, 20% selected from reusable
roles and patterns, and 10% available for a topic-specific visual invention.
This is a design boundary, not a scoring formula.

## What to freeze

Freeze anything whose failure is technical rather than expressive:

- the logical 16:9 stage and uniform scaling;
- keyboard, pointer and direct navigation;
- slide activation and animation reset;
- presenter view, notes, timer, overview and audience-window synchronization;
- reduced-motion behavior;
- type loading and fallbacks;
- safe zones and presentation-distance minimum sizes;
- section metadata and progress state;
- screenshot and validation hooks.

Do not spend model freedom on rebuilding these.

## What to constrain

Give each page role a contract:

- required semantic slots;
- maximum content budget;
- named geometric anchors;
- suitable visual patterns;
- allowed structural variants;
- failure conditions.

Constrain structure without freezing exact composition. A Section page may
change crop, direction or title scale while still obeying the Section contract.

## What to leave open

Reserve invention for the relationship that makes the current subject
memorable:

- the product-specific object;
- the concrete metaphor;
- the decisive crop;
- the causal motion;
- one unusual but accurate typographic move.

Do not invent new navigation, grids, card systems or animation plumbing merely
to make the deck feel custom.

## Source-first workflow

Keep a deck source file separate from the rendered artifact. It should define,
at minimum:

- deck-level communication change;
- palette and typography token choices;
- slide order;
- role, claim and semantic line breaks per slide;
- selected visual pattern;
- asset references;
- motion beats;
- speaker notes.

Fix the source and regenerate. Do not patch a compiled artifact when the source
exists.

## HTML implementation

Choose the runtime before composing slides:

- Use Slidev or another proven presentation runtime for live talks that require
  presenter mode, speaker notes, current/next previews, timer, overview,
  annotations, recording, export, or synchronized windows.
- Use `assets/html-deck-starter/` for a standalone fixed-stage artifact whose
  simplicity or single-file delivery matters more than presenter tooling.
- Reuse an existing project's runtime when it already satisfies the stage,
  navigation, lifecycle, notes and validation contract.

Do not rebuild presenter mode merely to match a visual style. Runtime chrome is
infrastructure; the deck's authored canvas, tokens, type, icons, visual
relationships and motion carry the style.

For Slidev, keep `slides.md` as the source of truth, store speaker notes in the
slide's notes block, put the deck-specific visual system in a dedicated style
file, use click steps for speaker-controlled causal beats, and build with a
base path that keeps `/presenter/<slide>` deep links functional.

For the standalone starter, preserve its stage, scaling, navigation and
lifecycle code. Replace slide content and extend role-specific CSS locally.

Use one `<section class="slide">` per slide with:

- `data-slide`;
- `data-role`;
- `data-layout`;
- `data-motion`;
- `data-anchor`;
- optional `data-overflow="intentional"` for a verified deliberate crop;
- one `.slide-title`;
- an optional `.slide-visual`;
- optional `.speaker-notes`.

Run `scripts/validate-html-deck.mjs` before visual review.

Generate from source when possible:

```bash
node scripts/create-html-deck.mjs deck-source.json output/deck
```

Keep topic-specific CSS in `custom.css`. `--force` updates generated runtime and
HTML while preserving that file.

Run browser geometry, interaction and screenshot QA:

```bash
node scripts/qa-html-deck.mjs output/deck \
  --screenshots output/qa \
  --motion-slide 6
```

Use `--motion-slide` for slides whose claim depends on repetition,
accumulation, landing or another multi-beat action. Inspect the complete sample
strip, not only the final frame.

For a presenter-enabled runtime, also test:

1. direct loading of both the audience route and a nested presenter route;
2. current slide, next slide, notes and timing controls;
3. presenter navigation synchronizing the audience window;
4. click steps advancing individually before the next slide;
5. notes and visual state remaining correct after direct navigation.

## Native PPTX implementation

Prefer real slide-master layouts and placeholders when a `.pptx` template
exists. Map semantic roles to named master layouts. Do not treat a designed
template as a background image and position unrelated text boxes over it.

Use HTML-to-PPTX only when HTML is the intended source of truth and editability
requirements are understood.

## Validation layers

Run all four layers:

1. **Source checks** — required roles, claims, text budgets, asset existence.
2. **Static implementation checks** — stage contract, metadata, forbidden
   viewport reflow, duplicate IDs, missing titles.
3. **Rendered geometry checks** — overflow, overlap, anchor alignment, aspect
   ratios, safe zones.
4. **Visual and motion review** — full-size frames, contact sheet, animation
   opening/middle/impact/final states.

Passing static checks is necessary but never sufficient.
