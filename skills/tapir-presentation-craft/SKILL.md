---
name: tapir-presentation-craft
description: Design, prompt, review, and refine concise, forceful, imageable presentations using Tapir's preference for one clear claim per slide, one memorable visual relationship, poster-like hierarchy, selective icon use, semantic typography contrast, restrained color, and perceptible decisive motion. Default unspecified presentation, slides, deck, or PPT creation requests to a Slidev HTML deck with presenter mode; use native PPTX, PowerPoint, Keynote, or Google Slides only when the user explicitly requests that format. Use when creating or critiquing presentations, pitch decks, technical talks, product presentations, conference talks, or presentation design systems; translating dense material into a visual narrative; preparing art direction for slide visuals; or diagnosing slides that feel generic, crowded, dry, UI-like, templated, weak, over-abstract, or over-animated.
disable-model-invocation: true
---

# Tapir Presentation Craft

Create presentations that are simple without being dry, sparse without being
empty, and expressive without losing accuracy.
Design for speaker-led delivery. The slide is a visual amplifier and memory
surface, not a transcript or self-contained document. Let the speaker carry
qualification, examples, and connective explanation; let the slide carry the
claim, image, and emotional force.

Treat this Skill as the design and narrative layer. Use the appropriate
artifact Skill or tool for implementation:

- local `.pptx` or PowerPoint: use the presentation artifact workflow;
- HTML slides: use the relevant web/site workflow;
- native Google Slides: use the connected Slides workflow;
- visual generation: use ImageGen only when an original illustration materially
  improves the slide.

## Choose the output format

Default to **Slidev HTML** when the user asks to create a presentation, slides,
slide deck, deck, or “PPT” without explicitly naming a native file format.
Treat “PPT” as the generic presentation concept, not an implicit `.pptx`.
Presenter mode, notes, synchronized windows, click-step animation, or live
browser delivery also require Slidev. Switch to native PowerPoint, Keynote, or
Google Slides only when the user explicitly names that format. Do not ask a
format question merely because the user said “PPT”.

Read [references/system-architecture.md](references/system-architecture.md) for
the complete routing and delivery contract.

## Use the reusable system

Do not rebuild stable presentation plumbing for every deck. Separate the work
into:

1. fixed runtime and tokens;
2. reusable page-role contracts;
3. reusable visual action patterns;
4. structured deck source;
5. topic-specific composition;
6. deterministic and visual validation.

Freeze mechanics, not silhouettes. Reusing a runtime, token set, title logic,
or page-role contract does not authorize repeating the same composition across
case slides. When several slides share a role, vary the dominant relationship,
mass distribution, crop, anchor, and motion verb according to the subject.

Read [references/system-architecture.md](references/system-architecture.md)
when creating a reusable system, choosing between HTML and native PPTX, or
deciding what belongs in a template.

For a live HTML presentation that needs speaker notes, presenter view,
current/next previews, timer, overview, drawing, recording, or synchronized
audience and presenter windows, prefer a mature presentation runtime such as
Slidev. Do not rebuild those facilities. Keep this Skill's narrative, visual,
typographic, icon, motion, and validation rules as a framework-independent
craft layer.

Use `assets/html-deck-starter/` only for a deliberately standalone deck that
does not need a mature presenter surface, or when an existing project already
provides an equally strict fixed-stage runtime. Preserve its 1920×1080 stage,
uniform scaling, navigation, slide lifecycle, and reduced-motion behavior.
Replace its example content; do not treat the example slides as a mandatory
visual skin.

Prefer source-first generation:

```bash
node scripts/create-html-deck.mjs deck-source.json output/deck
```

The generator maps structured roles to stable HTML and copies the runtime. Put
topic-specific composition in `custom.css`. Regenerating with `--force`
preserves that file.

Use `assets/examples/gpt-principles/` as a forward-tested source-and-theme
example when a concrete reference is useful. Copy its `custom.css` only as a
learning aid; do not make every deck resemble the GPT example.

Before implementation:

- map the outline with
  [references/page-roles.md](references/page-roles.md);
- choose one visible verb per slide with
  [references/visual-patterns.md](references/visual-patterns.md);
- record the plan using
  [references/deck-schema.md](references/deck-schema.md).

Run the structural validator before browser review:

```bash
node scripts/validate-html-deck.mjs path/to/deck-or-index.html --strict
```

Then run rendered QA when Playwright is available:

```bash
node scripts/qa-html-deck.mjs path/to/deck \
  --screenshots output/qa \
  --motion-slide 6
```

Set `TAPIR_NODE_MODULES` to a `node_modules` directory containing Playwright
when it is not installed beside the deck. The structural validator and rendered
QA catch regressions; neither replaces projector-distance or aesthetic review.

After changing the reusable runtime, generator, role templates, icons, motion,
or validators, run the bundled end-to-end fixture:

```bash
node scripts/self-test.mjs
```

With `TAPIR_NODE_MODULES` set, the self-test also performs rendered geometry,
interaction, screenshot, and multi-beat motion checks.

## Establish the canvas contract

For HTML presentations, decide whether the artifact is a slide deck or a
responsive story before writing layout code. A slide deck must use a fixed
aspect-ratio stage—normally 16:9—scaled uniformly inside the browser. Letterbox
or pillarbox mismatched windows instead of reflowing, stretching, or
recomposing the slide.

Use one logical coordinate system for the complete slide. Scale typography,
spacing, strokes, controls, and motion with the stage, not independently with
the outer viewport. Do not use `100vw`, `100vh`, breakpoint reflow, or unrelated
percentage coordinates when they can change the authored composition.

Preserve source-media anatomy. Inspect the intrinsic ratio of every important
image before choosing `cover`, `contain`, or a crop. Use `cover` only when the
crop is explicit and visually verified; accidental clipping is a bug.

Objects participating in one relationship must share a geometric anchor:

- a knob and its display share one shaft or axis;
- a selector and selected item share one aperture or slot;
- a moving packet and its targets share one path and depth order;
- connectors terminate on exact object anchors rather than approximate
  percentages.

If several objects are positioned independently but expected to look connected,
reject the implementation before polishing it.

## Core taste

Prefer:

- one audience-facing claim per slide;
- one imageable idea that the audience can hold while the speaker talks;
- one concrete action, contrast, or relationship that makes the claim visible;
- poster-like hierarchy with a large readable title;
- one dominant recall hook: “the slide with the ___”;
- bold black/white or light/dark massing before fine detail;
- sparse but purposeful use of icons;
- typography roles chosen by meaning, not a blanket style rule;
- one focal color that carries the action;
- perceptible, forceful, interruptible motion;
- layouts that remain clear at presentation distance and as thumbnails.

Treat boldness as a compositional verb, not a size setting. Let one action cut,
connect, land, block, or reveal across the composition. A large isolated icon is
not bold when it does not affect anything.

Avoid:

- topic-label titles that force the audience to find the point;
- card grids, dashboards, UI panels, or repeated containers used as a default;
- thin, timid diagrams whose relationships disappear at presentation distance;
- icon soup, but also text-only austerity that feels unnecessarily dry;
- one typeface treatment applied to every semantic role;
- generic technology imagery, node clouds, glowing brains, and abstract sparks;
- 1-bit, Swiss, editorial, corporate, or any other style used as an automatic
  skin rather than a content-driven dialect;
- slow fades, decorative floating, bounce, elastic overshoot, and long chains of
  unrelated animation.
- repeating the same title-plus-center-diagram-plus-bottom-label skeleton across
  consecutive evidence or company slides;
- treating three or four footer blocks as the animation while the main visual
  remains inert;
- explanatory completeness that turns the slide into speaker notes.

## Define the communication change

Write one sentence before planning slides:

> By the end, **[audience]** should **[understand, believe, choose, or do]**
> because **[central takeaway]**.

Then choose a narrative spine that creates that change. An agenda is not a
narrative. Use a cumulative structure such as question → mechanism → answer,
problem → cause → decision, or current state → change → future state.

## Build the whole-talk rhythm

For a complete talk, default to Cover → Intro → Agenda → Section breaks →
Evidence or cases → Summary → Q&A → optional Thanks. Treat these as page roles,
not compulsory filler. Give each structural page a distinct job and a visible
change of pace.
Read [references/page-roles.md](references/page-roles.md) for the complete
contracts, content budgets, patterns, and failure conditions.

## Compose one slide story

For every slide, write:

> One dominant subject performs one visible action on or with one supporting
> object, proving one claim.

The sentence may describe typography, data, a diagram, an illustration, or a
physical metaphor. Reject a slide that needs “and” more than once.

Budget the visual weight:

- dominant claim, subject, or action: 55–70%;
- supporting evidence or context: 20–35%;
- semantic accents, including icons and metadata: 0–10%.

Keep the element list to:

1. one takeaway title;
2. one dominant motif or evidence object;
3. one broad supporting relationship;
4. zero to three semantic icons or accents by default.

When the speaker will explain the mechanism, omit secondary facts that do not
change the first read. Keep only enough text to name the claim and orient the
visual relationship.

Icons are encouraged when they make recognition faster, provide rhythm, or keep
a sparse slide from feeling sterile. They must participate in meaning—trigger,
state, category, direction, tool, or result—not decorate every heading.

Size icons optically, not by matching their CSS box to adjacent type. Compare
visible ink, stroke weight, cap height, and occupied area at presentation
distance. A thin outline icon beside a heavy Chinese display word usually needs
a substantially larger geometric box. Align the icon and label to one visual
axis or baseline, then inspect the pair at full size and as a thumbnail. Reject
the “large word plus tiny corner symbol” silhouette unless subordination is the
explicit meaning.

Prefer a mature, consistent icon library over redrawing familiar objects as
custom SVG. Use custom geometry to explain a topic-specific relationship or
transformation, not to reconstruct ordinary objects that already have clear
icons. An agenda, taxonomy, sequence, or tool landscape may use three to six
icons when the set itself is the visual grammar.

Make an icon touch the relationship it explains: anchor it to a target, place it
on a path, let it interrupt a surface, or make it trigger the visible action.
Reject a floating icon that could move to any empty corner without changing the
slide. If the relationship itself forms a stronger recognizable sign, prefer
that sign over an additional generic icon.

## Use typography semantically

Default to a highly readable sans-serif system for titles, body copy, diagrams,
numbers, and technical structure.

Use a serif or another contrasting face selectively when it has a job:

- an artistic or editorial voice;
- a quoted or human voice;
- one metaphorical action phrase;
- a word treated as the illustration itself;
- a deliberate contrast against the structural sans-serif layer.

Do not ban serif type, and do not spread it across the deck merely to create
“style.” Keep mixed-type roles consistent and readable. Remove italics when
they weaken Chinese readability. Shorten copy before tightening tracking,
compressing line height, or shrinking type.

Write display titles as intentional semantic lines before styling them. For
Chinese, treat each line as a complete breath or question unit. Do not let JSX
whitespace, container width, or automatic wrapping decide the pause. Keep color
continuous inside one semantic unit unless the color change itself conveys a
meaningful boundary.

Read [references/visual-language.md](references/visual-language.md) when choosing
typography, icons, color, imagery, 1-bit treatment, or motion.
Read [references/icon-system.md](references/icon-system.md) when selecting an
icon family, deciding between library icons and custom SVG, or correcting a deck
that feels too abstract or dry.

## Use brands and product evidence

When a slide is about a named company, model, or product, research its official
brand assets and product surfaces before inventing an abstract substitute.
Prefer official marks and product evidence, then library icons, then custom
geometry. Preserve the shared deck system while borrowing restrained brand
cues. Make screenshots prove the claim, package them locally, and never let
decorative geometry unintentionally cross text or evidence.

Read [references/icon-system.md](references/icon-system.md) and
[references/validation-and-review.md](references/validation-and-review.md) for
the complete brand, evidence, crop, and overlap checks.

## Turn information into a relationship

Choose the relationship before choosing a layout:

- sequence: cut, pass, land, accumulate, repeat;
- causality: push, pull, amplify, block, unlock;
- attention: focus, connect, weight, reveal, occlude;
- comparison: align, split, overlap, diverge;
- hierarchy: scale, crop, isolate, subordinate;
- probability: compete, narrow, select, branch;
- transformation: fold, compress, expand, translate.

Prefer interaction over a collection of labeled objects. Preserve recognizable
anatomy. If a diagram needs a paragraph to explain what viewers are seeing,
simplify or choose a more literal relationship.

When a key word names a concrete object or action, test whether the word itself
can take on that object's recognizable anatomy: rain can fall as a drop, a lock
can close, a door can open. Prefer this embodied word-image over a generic box
and connector when it stays accurate.

## Choose a visual dialect

Let the content choose the dialect. Possible modules include:

- editorial minimal;
- typographic signal;
- dimensional overlap;
- print-like or 1-bit accent;
- evidence-led technical poster;
- product-specific illustration.

Treat 1-bit as an optional medium or accent, not the default presentation
surface. Borrow its useful grammar—strong silhouette, radical economy, large
type, purposeful texture—while retaining grayscale or color when projection,
data, or relational clarity needs it.

When the direction is ambiguous, propose up to three genuinely different
strategies. Do not force three concepts when the user has already approved a
direction. Generate one direction at a time unless a batch is explicitly
requested.

## Motion

Give each slide at most one primary motion idea. This limits the motion
vocabulary, not the number of beats. When repetition, accumulation, or iteration
is the claim, replay the same causal action for two to four legible rounds:

- cut apart;
- strike or connect;
- land or lock;
- reveal through occlusion;
- advance along a path;
- replace one state with another.

Use presentation timing, not UI micro-interaction timing. Default a primary
audience-facing action to roughly 480–900 ms with decisive ease-out. A short
causal sequence may occupy about 900–1600 ms. A repeated or cumulative mechanism
may occupy roughly 1600–4000 ms across two to four rounds, with later rounds
compressed once the rule is understood. Secondary stagger may follow within
40–120 ms. Prefer a clear start, readable travel, and firm stop. Use springs
only when elasticity is part of the meaning.

Use an odometer count-up only for one or two claim-bearing numbers that express
growth, accumulation, or a reached threshold. Keep signs and units stationary,
decelerate into the exact value, and preserve it in static viewing. Read
[references/visual-patterns.md](references/visual-patterns.md) for its full
timing and failure contract.

Motion must reveal hierarchy or causality. The final static frame must remain
complete and understandable. Keep the main object, particles, path, and impact
effect aligned to one physical direction and depth order.

Animate the claim-bearing relationship. A supporting label may appear with the
action, but it cannot be the only moving element when the slide promises a
flow, convergence, cut, takeover, launch, accumulation, or transformation.

Use a small semantic slide-transition grammar rather than one default fade:

- use a hard cut or directional wipe for evidence progression;
- use a scale or mass change for section shifts;
- use an opening, closing, or rise only when the next slide's main metaphor
  supports it.

Keep the grammar to roughly two to four transition families per deck. Variation
should signal narrative function, not advertise effects.

For multi-beat motion, write a small beat map before implementation:

| Beat | Subject | Repeated verb | Result |
| --- | --- | --- | --- |
| 1 | first object | lands | first state becomes visible |
| 2 | next object | lands | pattern becomes recognizable |
| 3 | selected object | lands | claim resolves |

Keep the verb coherent across beats. Add a new motion vocabulary only when the
claim itself changes.

## Workflow

1. Inspect the audience, presentation job, source material, hard constraints,
   real product workflow, official brand assets, product evidence, and current
   factual claims.
2. Verify unstable facts before designing around them.
3. Write the communication-change sentence and narrative spine.
4. For each slide, define:
   - takeaway title;
   - semantic line breaks;
   - narrative job;
   - page role and named layout;
   - one-sentence visual story;
   - visual action pattern and shared anchor;
   - recall hook;
   - evidence or source;
   - optional icon role;
   - motion verb and beat map, if any.
5. Select a visual dialect and define typography, palette, icon family, image
   treatment, and motion timing as one system.
6. Implement the lowest-density version that still proves the claim.
7. For HTML decks, lock the stage ratio, inspect source-media ratios, and define
   shared anchors before animating.
8. Run the reusable system's structural validator, then fix its source rather
   than patching the compiled artifact.
9. Run rendered QA in a 16:9 viewport and a mismatched tall window. Capture
   motion samples for every slide whose claim depends on repeated beats.
10. When presenter mode is required, open audience and presenter windows
    together; verify notes, current/next previews, timer controls, deep links,
    click-step progression, and synchronized navigation.
11. Review the complete deck at full size and as a thumbnail sequence.
    Reject three consecutive evidence slides with the same dominant silhouette,
    even when their colors, icons, or labels differ.
12. Validate in the user's actual presentation window. A convenient test
   viewport is supplemental evidence, not a substitute.
13. Change one major variable per iteration. Preserve anything the user
   explicitly approved.

## Review format

Lead with the actual judgment. Do not defend a weak result.

| Signal | Works | Needs change |
| --- | --- | --- |
| First read | What is understood in three seconds | Ambiguity or mistaken read |
| Claim | What the audience can repeat | Topic label or unsupported conclusion |
| Recall hook | The memorable object or relationship | Generic or reusable metaphor |
| Hierarchy | What dominates and why | Competing type, color, icons, or detail |
| Typography | Readable roles and useful contrast | Tight, heavy, arbitrary, or inconsistent type |
| Icons | Semantic rhythm or recognition | Decorative repetition or unnecessary dryness |
| Motion | One clear causal action | Slow, ornamental, or competing movement |
| Distance | What survives at thumbnail/projector size | Thin lines, small labels, or collapsed detail |

Read [references/validation-and-review.md](references/validation-and-review.md)
for detailed acceptance gates and format-specific checks.

## Acceptance gate

Reject or iterate unless all are true:

- the deck has one clear communication change;
- every slide makes one audience-facing claim;
- every slide can be described in one short visual sentence;
- the dominant relationship is visible without speaker explanation;
- one focal point clearly dominates;
- the slide has a recall hook specific to the subject;
- icons are either meaningfully used or deliberately unnecessary;
- icon and adjacent type are optically balanced in ink, scale, axis, and
  hierarchy rather than merely assigned similar pixel boxes;
- typography roles are readable and semantically justified;
- color reinforces hierarchy;
- named company or product slides use authentic brand cues and, when the claim
  concerns a real interface or object, appropriately large official product
  evidence;
- motion is perceptible, purposeful, and optional to understanding;
- odometer count-ups, when used, roll only claim-bearing digits, keep units
  stable, decelerate into an exact value, and preserve that value in static or
  reduced-motion viewing;
- the primary animation changes the claim-bearing relationship rather than only
  revealing footer labels;
- consecutive case or evidence slides do not reuse one dominant silhouette as
  a content template;
- page transitions use a restrained semantic grammar and are not one repeated
  default fade;
- the authored canvas does not reflow or distort in a mismatched browser window;
- related objects share exact anchors, paths, and depth order;
- decorative geometry never unintentionally crosses text, icons, labels, or
  evidence in any animation beat;
- important source images preserve their intended crop and aspect ratio;
- the slide remains legible from a distance and as a thumbnail;
- the result feels owned by this topic, product, or speaker rather than reusable
  by any presentation.
- the slide supports live explanation instead of duplicating it.
- stable runtime code is reused instead of being regenerated without cause;
- required presenter features come from a proven runtime and pass a dual-window
  synchronization test;
- every slide declares a page role, named layout, visual action, and shared
  anchor in its source plan;
- source, static, rendered, and motion validation layers have all been run.
