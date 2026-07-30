---
name: tapir-icon-craft
description: Design, prompt, review, and refine distinctive app logos and app icons using Tapir's preference for recognizable editorial illustration, one dominant product-specific relationship, disciplined visual hierarchy, industry-legible cues, bold cropping, restrained color, and small-size clarity. Use when creating or critiquing an app icon/logo, preparing ImageGen art direction, comparing icon concepts, translating user feedback into reusable taste constraints, or deciding whether an icon is focused, generic, over-abstract, over-detailed, or visually confused. This is a general icon-design skill and is not tied to PCB, orange branding, brushes, or any one product domain.
disable-model-invocation: true
---

# Tapir Icon Craft

Create icons that feel like a clear, memorable product scene rather than a
clever symbol that needs explanation.

## Core taste

Prefer:

- concrete but iconified subjects;
- one immediately readable action or relationship;
- a large dominant subject with bold, confident cropping;
- product meaning expressed through familiar domain cues;
- editorial illustration with restrained physical depth;
- strong silhouette and hierarchy before fine detail;
- a focal color that clearly outranks every supporting color;
- a composition that remains legible at Dock, taskbar, or launcher size.

Avoid:

- generic geometric technology marks;
- unrelated symbols placed side by side;
- forced shape fusion that creates an unintended third object;
- symmetric node diagrams, chip-plus-bulb clichés, and abstract sparks;
- icon soup, evenly distributed detail, or multiple competing focal points;
- photorealistic product rendering, glossy bevels, or decorative 3D;
- choosing an industry-standard color when its geometry alone can communicate
  the domain more harmoniously;
- using SVG merely because it is controllable when the desired result is an
  illustrated app icon.

## Default representation

Default to a polished editorial app-icon illustration when the product can be
communicated by a physical object, tool, material, or action.

Use a flat vector mark only when the user explicitly wants a corporate logo,
the product already has a vector identity system, or the symbol truly improves
when reduced to geometry.

Use ImageGen for illustrated concepts. Use deterministic SVG or vector drawing
for construction studies, final geometric marks, or when precise paths are the
actual deliverable. Do not substitute one mode for the other without considering
the desired visual character.

## Compose one icon story

Write a one-sentence story in this form:

> One dominant subject performs one product-specific action on or with one
> supporting object.

Examples:

- A sculpting tool pulls one clean form from a block.
- A camera lens reveals one translated layer.
- A notebook page folds into one navigational path.

Reject a brief that requires “and” more than once.

### Assign hierarchy

Budget the visual weight:

- dominant subject or action: 55–70%;
- supporting context: 20–35%;
- semantic accents: 0–10%, with at most two accents.

Treat domain details as recognition evidence, not a second illustration. Keep
the smallest set of cues that makes the supporting object unmistakable. If
removing a cue does not harm recognition, remove it.

As a default detail budget, allow one grouped structural motif and one isolated
recognition accent inside the supporting object. Add more only when the object
fails the small-size recognition test. Keep the support lower in contrast and
saturation than the dominant subject or action.

## Combine concepts through relationships

Prefer interaction over mutation:

- a tool acts on a domain object;
- a material passes through a process;
- one layer reveals or occludes another;
- one familiar object leaves behind a product-specific result.

Do not morph two familiar objects into one hybrid unless the hybrid still reads
correctly without explanation. If viewers perceive pliers, a scraper, a pen, or
another unintended object, abandon the morph instead of adding more detail.

Preserve the primary object's recognizable anatomy. Add domain meaning as
surface structure, context, or output—not by damaging its silhouette.

## Use industry cues selectively

Identify the two or three cues practitioners and ordinary users already
associate with the domain. Prefer shape, layout, and behavior over literal color.

When a standard domain color conflicts with the brand palette:

1. keep the domain geometry;
2. recolor it into supporting neutrals;
3. reserve the strongest brand color for the focal action.

Never let “more authentic” become “more visually dominant.”

## Control style and color

Build recognition from hard-edged masses first. Add only restrained depth:

- one front plane;
- optionally one side or overlap plane;
- one material texture only when it clarifies form.

Use saturation hierarchically. One vivid color should usually carry the action.
Keep large supporting surfaces neutral, muted, or darker. Reject two large,
similarly saturated color fields unless the contrast is the central identity.

Avoid continuous gradients, glow, and soft shadows as structural crutches.
Subtle material variation is acceptable after the silhouette works.

## Workflow

1. Inspect the product, its real workflow, existing brand colors, and any
   user-provided visual references.
2. Extract the product's one unmistakable action and two or three domain cues.
3. Write the one-sentence icon story and the permitted element list.
4. Propose up to three genuinely different strategies:
   - editorial minimal;
   - dimensional overlap;
   - typographic or print-like signal.
5. State which direction is recommended and why before generating.
6. Generate one direction at a time unless the user explicitly requests a batch.
7. Review the result at full size and as a 32–64 px thumbnail.
8. Diagnose feedback at the concept level before editing:
   - wrong object recognition;
   - weak focal hierarchy;
   - incompatible color relationship;
   - excessive detail;
   - generic or unowned metaphor.
9. Change one major variable per iteration. Preserve what the user explicitly
   approved.
10. Treat “good direction” as a candidate, not final approval. Ask before
    replacing formal app assets.

## Review format

When critiquing a candidate, use a compact table:

| Signal | Works | Needs change |
| --- | --- | --- |
| First read | What is recognized immediately | Any mistaken object or ambiguity |
| Focal point | The dominant subject/action | Competing color, detail, or scale |
| Product cue | The cues that connect it to the app | Generic or excessive cues |
| Small size | What survives at 32–64 px | Details that collapse or become noise |

Lead with the actual judgment. Do not defend a weak generation.

## Prompt requirements

For ImageGen prompts, specify:

- the dominant subject and its recognizable anatomy;
- the one supporting object;
- the action connecting them;
- the intended hierarchy and crop;
- the domain cues allowed;
- the palette hierarchy;
- the rendering style;
- unintended-object exclusions;
- a strict negative list of extra props and common icon clichés.

Read [references/generation-and-review.md](references/generation-and-review.md)
when generating, editing, or conducting a detailed visual review.

## Acceptance gate

Reject or iterate unless all are true:

- the icon can be described in one short sentence;
- the dominant object is recognized without explanation;
- the action is visible, not merely implied by a caption;
- the domain is supported by no more than the necessary cues;
- one focal point clearly dominates;
- color reinforces hierarchy rather than fighting it;
- the black/white silhouette remains coherent;
- the icon still reads at 32–64 px;
- no accidental object emerges from forced fusion;
- the result feels owned by this product rather than reusable by any app.
