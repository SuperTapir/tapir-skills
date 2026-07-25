# Visual language

Read this reference when defining or reviewing the deck's visual system.

## Contents

1. Hierarchy and density
2. Typography
3. Icons
4. Color
5. Imagery and 1-bit
6. Diagrams
7. Motion
8. Boldness
9. Anti-patterns

## Hierarchy and density

Build one composition, not a collection of interface components.

- Give the dominant claim, subject, or action 55–70% of the visual weight.
- Give evidence and context 20–35%.
- Reserve 0–10% for icons, navigation, citations, and semantic accents.
- Keep a broad quiet field. Empty space creates tension and separation; do not
  fill it with decorative marks.
- Concentrate detail near the focal relationship. Do not distribute detail
  evenly.
- Treat the title as part of the image. It may overlap, align with, reveal, or
  be acted on by the motif, but it must remain immediately readable.
- Assume a speaker is present. Put caveats, examples, transitions, and detailed
  reasoning in speech or notes unless they materially change the picture.
- Prefer one strong claim plus one memorable relationship over a complete
  on-slide explanation.

A sparse slide is not automatically elegant. Add a meaningful icon, material
plane, crop, or relationship when the page feels dry; do not add more prose.

## Typography

Use roles rather than a single-font ideology.

### Structural sans-serif

Use for:

- primary information architecture;
- body copy and labels;
- numbers, data, diagrams, and code;
- technical or product-specific language;
- repeated deck chrome.

Favor comfortable counters, clear Chinese forms, and moderate weight. Large type
does not need maximum weight. Avoid combining very heavy weight, tight tracking,
and compressed line height.

### Contrasting serif or display face

Use selectively for:

- an artistic, editorial, historical, or literary voice;
- quotations or human testimony;
- one metaphorical action phrase;
- a word serving as the illustration;
- deliberate contrast against the structural layer.

Keep at most one primary contrasting type role per slide. Do not use italics on
Chinese by default. Verify mixed-script baselines when English and Chinese share
a line.

### Readability rules

- Break lines by complete phrase, not by leftover space.
- Write the intended title rhythm explicitly before layout, for example
  `此刻 / 谁更重要？`; treat the slash as a semantic breath, not a responsive
  breakpoint.
- Keep a question, contrast, or action phrase intact unless the break creates a
  deliberate dramatic setup and payoff.
- Do not rely on source-code newlines or browser wrapping to create Chinese
  title rhythm. Render explicit line wrappers and prevent accidental wrapping.
- Remove punctuation from oversized display titles when the layout already
  provides the pause.
- Inspect full-width Chinese punctuation at final display size. Its empty glyph
  cell can create a visible hole at poster scale.
- Keep one semantic phrase in one focal color. A typeface change may distinguish
  voice or action without forcing a color break.
- Shorten copy before shrinking or compressing it.
- Use wider tracking for small metadata, not for large Chinese titles.
- Let large type breathe. As a starting point, use line height around 0.98–1.08
  and modest negative tracking, then inspect actual glyphs.
- Do not let a title banner intended as one line wrap.

## Icons

Icons are a semantic accent layer, not forbidden decoration.

Use icons to:

- identify a tool, object, action, state, category, or result;
- create a quick visual rhythm in a sparse sequence;
- replace repeated words;
- make a directional or causal relationship easier to scan.

Rules:

- use zero to three icons per slide by default;
- allow three to six when an icon sequence, taxonomy, route, or tool set is the
  dominant visual grammar;
- use one consistent family and stroke/fill logic across the deck;
- keep icons large enough for projection;
- let the icon participate in the composition;
- require a visible verb between icon and subject: cut, point, lock, select,
  trigger, contain, or transform;
- attach the icon to the exact point of action through contact, overlap, a
  connector, a shared axis, or a state change;
- prefer a specific domain icon over a generic spark or abstract node;
- use filled or bold icons when thin outlines disappear at distance.
- prefer a mature icon library for familiar nouns and actions;
- reserve custom SVG for a subject-specific relationship, transformation or
  metaphor that a library icon cannot express.

Reject:

- an icon before every heading or bullet;
- unrelated icon rows with equal visual weight;
- mixed icon families;
- tiny outline icons used to fill empty space;
- a large icon floating in unused space while the real diagram sits elsewhere;
- an icon and connector whose combined silhouette reads as an unrelated object;
- generic lightbulbs, brains, magic wands, rockets, and sparks unless the content
  literally requires them.

If removing the icon leaves the relationship equally clear, remove it. If the
main relationship can become a stronger sign by itself—a cut, lock, aperture,
slot, or target—let that sign serve the icon role.

## Boldness

Be bold through consequence, not decoration.

- Let one action govern the frame through scale, crop, direction, or
  displacement.
- Make the action change the supporting objects. A cut should separate pieces;
  a focus should alter weight; a selected token should occupy a real slot.
- Use cropping and hard edges to create pressure while preserving the anatomy of
  the relationship.
- Prefer one oversized decisive gesture over a large icon plus an unrelated
  diagram.
- Keep quiet space tense and directional, not merely unused.

Reject “bold” work when the only evidence is bigger type, a thicker stroke, or a
large symbol pasted into a corner.

## Color

Use saturation hierarchically.

- Choose one focal color for the action, decision, or selected state.
- Treat bright whiteboard blue around `#159BE8` as a preferred Tapir primary
  color when the subject benefits from clarity, structure, navigation, or an
  energetic section change.
- Let this blue carry routes, selected states, structural marks, and full-bleed
  Section pages. Do not distribute it evenly across every object.
- Keep large supporting planes neutral, muted, or darker.
- Use semantic red/green only when the meaning is genuinely risk/error or
  pass/improvement.
- Avoid two large equally saturated fields unless their conflict is the point.
- Prefer hard-edged masses over gradients, glow, and soft shadow.

A standard industry color is optional. If shape, layout, or behavior already
communicates the domain, recolor supporting elements to fit the deck and reserve
the strongest color for the action.

## Imagery and 1-bit

Use imagery when the subject benefits from a physical object, material, person,
place, or product-specific scene.

- Prefer one dominant subject and one relationship.
- Crop boldly.
- Keep the subject's anatomy recognizable.
- Let a concrete word become the object when that creates an immediate,
  accurate read: set “雨” inside a falling drop instead of connecting two
  generic word boxes with a line.
- Verify directional anatomy after every rotation or transform. A droplet's
  point, a blade's edge, and an arrow's head must still face the intended action
  in the final rendered silhouette.
- Use domain cues as evidence, not a second illustration.
- Do not use a generic stock image merely to make a slide less empty.

Use 1-bit or print-like imagery as an optional dialect:

- suitable for covers, section breaks, identity moments, or concepts whose
  silhouette matters;
- strong for immediate black/white recognition and memorable cropping;
- weak as a default for dense data, subtle hierarchy, or complex relational
  explanation.

Borrow 1-bit grammar even in color decks: large readable type, one recall hook,
radical economy, purposeful texture, and strong silhouette.

## Diagrams

Start with the relationship, not the components.

- Use thick enough connectors to survive projection.
- Vary weight only when weight has meaning.
- Put labels close to the relationship they explain.
- Use icons or concrete nouns to reduce abstract boxes.
- Keep connector semantics consistent.
- Remove any node or label that does not change the conclusion.

If the diagram resembles a software architecture canvas, dashboard, or flowchart
template but the audience only needs one relationship, collapse it into a poster.

## Motion

Default to one primary motion per slide.

“One primary motion” means one coherent verb, not one animated event. If the
claim is repeat, accumulate, generate, or iterate, show two to four rounds of
the same motion so the audience can perceive the pattern. Keep later rounds
shorter or more compressed once the rule is understood.

Suggested timings:

- slide change: 380–650 ms;
- title or focal object: 420–720 ms;
- relationship line or reveal: 520–900 ms;
- short causal sequence: 900–1600 ms total;
- repeated or cumulative sequence: 1600–4000 ms total across two to four rounds;
- secondary stagger: 40–120 ms;
- micro feedback: 120–220 ms.

Do not apply product-UI timing blindly to a live presentation. A projected
gesture needs enough duration for the audience to locate the subject, follow the
travel, and register the result. Keep the motion longer but not softer.

Leave enough recognition time between beats for the previous result to register.
Do not add a pause mechanically when continuous momentum makes the repeated verb
clearer.

Prefer:

- direct ease-out;
- a cut opening;
- a connector striking into place;
- an object landing or locking;
- a selected item replacing an empty slot;
- a layer revealing what matters.

Avoid:

- slow fades used for everything;
- floating loops;
- bounce or spring without physical meaning;
- more than one competing motion system;
- animation that leaves the final static frame incomplete.

## Anti-patterns

### Clean but generic

Symptoms: balanced columns, tasteful color, no memorable relationship.

Fix: identify the one recall hook and let it dominate through scale, crop,
overlap, or action.

### Sparse but dry

Symptoms: large title plus body copy, no visual rhythm or domain cue.

Fix: add one semantic icon, concrete object, directional force, or material plane.

### UI disguised as a slide

Symptoms: card grid, bordered list, pills, repeated panels, dashboard chrome.

Fix: remove containers and turn the selected comparison, sequence, or decision
into one visible relationship.

### Strong but hard to read

Symptoms: maximum weight, tight tracking, compressed line height, arbitrary line
breaks, too many type styles.

Fix: reduce weight and size, open line height, break by phrase, and keep type
contrast semantic.

### Stylish but inaccurate

Symptoms: metaphor implies the wrong mechanism; numbers look literal when they
are illustrative; a decorative image contradicts the claim.

Fix: label illustrative values, simplify the metaphor, or use a more literal
relationship.
