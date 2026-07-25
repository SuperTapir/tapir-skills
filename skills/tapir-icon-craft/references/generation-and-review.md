# Generation and review guide

Use this reference when preparing prompts, editing a candidate, or interpreting
user feedback.

## Prompt scaffold

```text
Use case: logo-brand
Asset type: app icon or logo lockup

Product truth:
<What the app actually helps a person do>

Icon story:
<One subject performs one action with one supporting object>

Dominant subject:
<Name it and list the anatomical features required for recognition>

Supporting context:
<One object or plane, plus the minimum domain cues>

Functional relationship:
<Painting, revealing, cutting, translating, organizing, measuring, etc.>

Composition:
<Angle, crop, overlap, optical center, quiet space>

Visual hierarchy:
<Dominant 55–70%, support 20–35%, accents <=10%>

Palette hierarchy:
<One focal color, supporting neutrals, forbidden competing colors>

Style:
<Editorial illustration, hard-edged print planes, restrained depth>

Small-size contract:
<What must still read at 32px>

Preserve:
<Explicitly approved elements from the previous candidate>

Change only:
<One major variable for this iteration>

Exclude:
<Unintended object reads, extra props, generic clichés, clutter, text>
```

## Anatomy rule

When a recognizable physical object is important, name its non-negotiable
parts. For example, a flat artist brush requires:

- a long handle;
- a visibly separate ferrule;
- one continuous bristle mass;
- a broad paint-loaded edge.

If these parts are missing, decorative detail cannot rescue recognition.

Apply the same reasoning to cameras, cutters, speakers, microscopes, notebooks,
musical instruments, game controllers, or any other product-relevant object.

## Relationship patterns

Choose one:

### Tool acts on material

Use when a product creates or edits something. Keep the tool anatomically
correct and place domain semantics in the material or result.

### Input transforms into output

Use when a product converts, translates, processes, or generates. Show one
clear before/after relationship with a single transition zone.

### Layer reveals layer

Use for compositing, imaging, privacy, inspection, or fabrication. Use one
strong occlusion and no more than three visible planes.

### Object follows path

Use for navigation, scheduling, automation, motion, or workflow products. Use
one subject and one path; do not add dashboard notation.

### Typography becomes mechanism

Use for strong names or technical utilities. Make the wordmark the primary
shape and modify only one letter or relationship. Preserve legibility.

## Failure diagnosis

### “It looks like another tool”

Cause: the hybrid silhouette overrode the intended object's anatomy.

Response:

1. stop polishing;
2. separate the objects;
3. restore the primary object's complete silhouette;
4. move domain meaning into context or surface detail.

### “It is more accurate but uglier”

Cause: domain authenticity added a competing palette or too many cues.

Response:

1. keep the recognizable geometry;
2. remove the literal domain color;
3. reduce cues to one grouped family;
4. reserve saturation for the focal action.

### “The focus is gone”

Cause: supporting detail became a second protagonist.

Response:

1. thumbnail the image;
2. identify the first two things the eye sees;
3. reduce the non-focal object to one grouped structural motif and one isolated
   recognition accent;
4. delete details until only one first read remains;
5. reduce contrast and saturation on the support.

### “It feels generic”

Cause: the metaphor fits many unrelated apps.

Response:

1. return to the real workflow;
2. replace generic light, spark, node, or chip symbols with one domain action;
3. use an interesting overlap, crop, or material change unique to that action.

### “It is too minimal”

Cause: simplification removed recognizable anatomy or product evidence.

Response:

1. add back one structural feature, not texture;
2. prefer a domain-specific route, joint, opening, material, or output;
3. keep the accent budget unchanged.

## Comparative review

When presenting multiple directions, vary the conceptual strategy rather than
minor styling:

| Direction | Primary device | Best for |
| --- | --- | --- |
| Editorial minimal | One object and one rule/beam/path | Calm, precise products |
| Dimensional overlap | One subject crossing one plane | Transformative workflows |
| Print-like signal | Bold shape plus controlled material field | Expressive creative apps |
| Typographic signal | Wordmark as mechanism | Memorable short product names |

Recommend one. Do not outsource all taste decisions to the user.

## Finalization

After explicit approval:

1. retain the original master;
2. prepare a clean 1024×1024 app-icon source;
3. inspect at 512, 128, 64, 32, and 16 px;
4. remove details that shimmer, merge, or turn into false shapes;
5. verify light and dark desktop contexts;
6. generate platform-specific masks or icon sets without baking in an
   unsupported outer shape;
7. integrate only after the user approves the actual reduced-size preview.
