# Icon system

Read this reference whenever a deck feels dry, abstract, visually repetitive,
or dependent on custom SVG diagrams.

## Default position

Use icons as a real visual vocabulary, not a reluctant afterthought. Prefer a
mature, coherent icon family over drawing a new SVG for every concrete noun.

Recommended families:

- Lucide for neutral technical and product language;
- Phosphor when stronger weight and more expressive variants are useful;
- Material Design Icons when unusually broad object, industry, device, or state
  coverage is required;
- Material Symbols when familiar platform or action semantics matter;
- Simple Icons or product-owned marks when the named company, technology, or
  product is the subject.

Do not mix families within one deck unless the difference itself has meaning.

For HTML decks, use Iconify as the unified lookup and build-time packaging
layer. Install individual offline collections rather than depending on the
runtime API:

- `@iconify-json/mdi` for broad concrete coverage;
- `@iconify-json/ph` for adjustable optical weight;
- `@iconify-json/simple-icons` for brand identity;
- Lucide for the deck's neutral action language.

This is one selection system, not permission to mix four visual dialects in one
composition. Choose one neutral family per deck, use a denser variant only when
optical balance requires it, and reserve brand marks for identity. Package only
the collections the project uses; real product screenshots and photographs
remain separate evidence assets.

## Icon counts

Zero to three icons remains a useful default for a single poster-like
composition. It is not a hard limit.

Use three to six icons when:

- the icons form the agenda or sequence;
- the audience must scan categories quickly;
- the icons replace repeated labels;
- the icon set is the dominant visual grammar rather than decoration.

Reduce the count when every icon has equal weight but no visible relationship.

## Library icons versus custom drawing

Use a library icon when the audience needs to recognize:

- a familiar object;
- a product action;
- a tool or platform;
- a state;
- a category;
- a navigation or workflow step.

Use custom geometry or SVG only when the slide needs to show:

- a topic-specific relationship;
- a physical transformation;
- a shared path or anchor;
- a visual metaphor that no existing icon expresses accurately.

Custom SVG should explain a verb. It should not spend dozens of paths
reconstructing an ordinary cloud, person, document, lock or cursor that a
well-made icon already provides.

## Composition

Let icons occupy a clear role:

- **actor** — the icon performs the action;
- **target** — another object acts on it;
- **state** — its fill, weight or position changes;
- **waypoint** — it marks a step on a route;
- **legend** — it replaces a repeated word;
- **rhythm** — a short sequence of icons creates pacing.

An icon may be large, cropped or repeated when it remains recognizable. Keep
stroke weight and optical size consistent with projection distance.

## Optical pairing with type

Do not equate equal CSS boxes with equal visual weight. Judge the amount of
visible ink:

- thin outline icons commonly need a geometric box around 1.15–1.45 times the
  adjacent heavy text cap height;
- filled or dense brand marks may need a smaller box;
- Chinese display characters usually carry more visual mass than Latin labels,
  so compare the rendered pair rather than copying a numeric ratio;
- align icon and label to one baseline, centerline, or shared container edge;
- keep the gap proportional to the icon's visible edge, not its transparent
  viewBox.

At full size, the icon must read as the same semantic level as its label when it
is a peer. At thumbnail size, neither should collapse into a footnote. Reject a
large word with a tiny icon stranded above or in a corner unless the icon is
intentionally metadata.

## Brand and product marks

For named companies, models, and products, prefer official marks over generic
stand-ins. Preserve their recognizable proportions and do not redraw them with
unrelated library glyphs. Use brand marks for identity; continue using the
deck's chosen icon family for generic actions such as search, payment, control,
or delivery.

Let brand color identify the subject but keep common deck tokens for structure.
A row of peer brand marks should have equal optical prominence, not equal
bounding boxes.

## Starter runtime

`assets/html-deck-starter/` bundles Lucide locally so the starter works offline.
Use:

```html
<i data-lucide="scan-eye" aria-hidden="true"></i>
```

The runtime converts these placeholders after load. Keep a text label or
accessible name when the icon carries essential meaning.

## Review

Ask:

- Would a familiar icon communicate this object faster than custom SVG?
- Does the icon participate in the slide's visible verb?
- Are several icons creating a readable system or merely filling space?
- Are stroke, fill, size and color consistent?
- Is the icon optically balanced with adjacent type rather than only
  numerically similar in width or height?
- Are official brand marks used for named companies and product identity?
- Does the slide still rely on abstract geometry where a concrete object would
  be more imageable?
