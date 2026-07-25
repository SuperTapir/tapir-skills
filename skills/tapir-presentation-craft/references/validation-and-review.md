# Validation and review

Read this reference before delivering a deck or conducting a detailed critique.

## Contents

1. Narrative checks
2. Slide checks
3. Visual-system checks
4. Motion checks
5. Format-specific checks
6. Review procedure

## Narrative checks

- State the audience and communication change in one sentence.
- For a complete talk, verify the sequence includes an intentional cover,
  reason-to-listen Intro, route-setting agenda, visible Section changes,
  evidence/case development, Summary, Q&A, and optional Thanks.
- Confirm every structural page has a distinct job. Reject a cover that behaves
  like an agenda, an agenda that behaves like a card gallery, or a Section page
  that fails to change pace.
- Confirm the opening creates a question, tension, or reason to listen.
- Confirm every slide advances the narrative rather than merely covering a topic.
- Confirm evidence is followed by meaning or consequence.
- Confirm the ending resolves the opening with a decision, implication, action,
  or synthesis.
- Remove redundant summaries and agenda-like repetition.
- Confirm the deck is designed to be spoken. Move supporting explanation that
  does not change the visual claim into speaker notes or delivery.

## Slide checks

For each slide:

1. Read only the title. It should communicate the takeaway.
2. View the slide for three seconds. Record the first read.
3. Describe the visual in one short sentence.
4. Name the recall hook.
5. Hide the body copy mentally. The relationship should still be visible.
6. Inspect at thumbnail size. The focal point and silhouette should survive.
7. Remove one element. If recognition does not weaken, keep it removed.
8. Ask what the speaker contributes. If the slide already says everything,
   reduce it.

Reject a slide when:

- the title names a topic instead of making a claim;
- two claims compete;
- the visual could be reused for an unrelated subject;
- the main action exists only in speaker explanation;
- text, icons, and diagram all repeat the same information;
- thin lines, tiny labels, or low-contrast details carry essential meaning;
- a grid of boxes substitutes for prioritization.

## Visual-system checks

### Typography

- Verify the structural sans-serif role is consistent.
- Verify every contrasting serif or display treatment has a semantic job.
- Check mixed Chinese/English baselines and font fallback.
- Check that large type is not simultaneously too heavy, tight, and compressed.
- Check line breaks by phrase.
- Read Chinese display titles aloud line by line. Each rendered line must be a
  complete semantic breath, not a leftover fragment.
- Inspect oversized full-width punctuation for unintended visual holes.
- Confirm color changes align with semantic boundaries.
- Check body text at presentation distance.

### Icons

- Confirm icons make recognition faster or add needed rhythm.
- Confirm zero to three icons are usually enough for one composition.
- Allow three to six when the icon set itself forms a route, taxonomy or
  sequence.
- Confirm one icon family, stroke logic, and optical size.
- Compare visible ink against adjacent type. Enlarge thin outline icons when an
  equal numeric box still reads as a footnote.
- Confirm peer icon-and-label pairs share one visual axis or baseline.
- Reject a large word with a tiny stranded symbol unless the hierarchy is
  intentional.
- Confirm familiar objects use a mature icon library instead of unnecessary
  custom SVG drawing.
- Remove decorative icons that do not participate in meaning.
- Trace the icon to the exact object, path, or state it affects.
- Move the icon mentally to another empty corner. If meaning does not change, it
  is floating decoration.
- Inspect icon-and-connector silhouettes for accidental readings.
- Prefer the relationship itself as the sign when an extra icon duplicates it.
- Add an icon or concrete cue when a sparse slide feels dry.

### Boldness

- Name the one action that governs the frame.
- Confirm that action visibly changes or displaces another object.
- Confirm scale, crop, and direction reinforce the same action.
- Reject oversized elements that remain isolated from the main relationship.
- Distinguish intentional tension from merely unused space.

### Color

- Confirm one focal color dominates.
- Confirm large supporting surfaces stay subordinate.
- Check grayscale or desaturated viewing for hierarchy.
- Confirm color is not the only carrier of essential meaning.

### Imagery

- Confirm the main subject is recognizable without explanation.
- For a named company, model, or product, confirm identity uses an official mark
  and the page borrows a restrained, recognizable brand cue.
- When the claim concerns a real interface, workflow, or physical product,
  confirm an official product screenshot or photograph is considered before an
  abstract substitute.
- Confirm screenshots are large and cropped enough to prove the claim, not used
  as decorative wallpaper.
- Record official asset sources and package required images locally for offline
  delivery.
- Confirm crop and placement support the current claim.
- Confirm transformed directional objects still face correctly.
- Confirm no stock or generated image is used only as atmosphere.
- Confirm 1-bit or print texture is optional and appropriate to the content.

## Motion checks

- Name the slide's one primary motion idea.
- Point to the claim-bearing object or relationship that changes. Reject motion
  confined to captions, footer tags, progress blocks, or decorative accents
  while the main visual remains static.
- If repetition is the claim, confirm the animation demonstrates multiple
  rounds rather than showing only one example and labeling it “repeat.”
- Confirm it reveals hierarchy, causality, sequence, or selection.
- Confirm the primary audience-facing action is perceptible, usually around
  480–900 ms; allow roughly 900–1600 ms for a short causal sequence.
- Allow roughly 1600–4000 ms when two to four rounds are necessary to prove
  repetition or accumulation.
- Reject UI-fast motion that completes before an audience can locate and follow
  the relationship.
- Confirm animation has a clear stop.
- Confirm the main object, particles, connectors, and impact effect share one
  coherent direction and depth order.
- Confirm reduced-motion or static viewing preserves the complete slide.
- For an odometer count-up, confirm digits move upward, decelerate into the
  exact sourced value, and stop completely; keep signs, separators, decimals,
  and units stationary.
- Confirm the count-up lasts long enough to read as accumulation—typically
  1200–1800 ms—and does not literally iterate through a large numeric range.
- Reject rolling every metric, continuous spinning, ambiguous intermediate
  values, layout width changes between digits, or a number that restarts without
  an intentional slide replay.
- Remove decorative delay and chained entrances.
- Test rapid next/previous input for interruption safety.

## Sequence variation checks

- Compare every run of three or more evidence or case slides as thumbnails.
- Ignore copy and color first; inspect only silhouettes and visual mass.
- Reject a run that keeps the same title position, central relationship frame,
  and bottom label strip while merely swapping company names or icons.
- Preserve the deck's family resemblance through tokens, typography, spacing,
  icon family and transition grammar—not by cloning the same composition.
- Give each recurring subject a distinct recall hook and visible verb.
- Use two to four page-transition families mapped to narrative roles. Reject a
  single default fade across the complete talk and reject arbitrary
  effect-per-slide novelty.

## Format-specific checks

### HTML deck

- First classify the artifact: fixed slide deck or responsive web story. Do not
  combine the two layout models accidentally.
- For a fixed deck, measure the rendered stage in the user's actual browser
  window and confirm the authored aspect ratio. A 16:9 stage should remain
  approximately `1.778` even when the browser is taller, narrower, or resizable.
- Verify mismatched windows produce intentional letterboxing or pillarboxing,
  not slide reflow, stretching, or independent element drift.
- Inspect the intrinsic and rendered aspect ratios of important images.
  Reject unplanned `object-fit: cover` cropping.
- For every causal composition, measure or visibly trace the shared anchors:
  shafts meet controls, connectors terminate on objects, selection marks align
  with the selected surface, and moving objects remain on one path.
- Check depth order at opening, middle, impact, and final frames. A transient
  overlap is still a bug when it contradicts the physical relationship.
- Trace every decorative stroke, wipe, and oversized gesture through all click
  states. Reject any unintended crossing of display text, icons, labels, or
  evidence even when the final frame looks acceptable.
- Test keyboard previous/next, direct navigation, wheel, and touch when supported.
- When presenter mode is required, test a nested presenter deep link rather
  than only the root presenter URL. Confirm current slide, next slide, speaker
  notes, timer and controls render correctly.
- Open audience and presenter pages in the same session. Advance from the
  presenter controls and confirm the audience route and click state synchronize.
- Treat presenter infrastructure as a runtime responsibility. Do not accept a
  visually styled but functionally partial custom clone when a mature runtime
  already supplies the required capabilities.
- Replay every slide entry in real time. Inspect the opening, at least one middle
  beat, the impact moment, and the final frame; a final screenshot alone cannot
  validate motion.
- Test the target 16:9 viewport, then repeat in the user's actual window.
- Test a narrow viewport only when the deck is intentionally responsive. A
  fixed deck should scale uniformly rather than switch to a mobile layout.
- Check every slide for horizontal and vertical overflow.
- Check focus states, disabled controls, and `prefers-reduced-motion`.
- Verify offline or fallback behavior when external assets are used.
- Test rapid next/previous/direct navigation for stale active states and
  half-finished transforms.
- Build and run the project's automated checks.

Do not declare visual success from build, lint, DOM, or a single final
screenshot. These prove implementation health, not composition quality.

### PowerPoint or Keynote

- Render every slide.
- Inspect full-size slides individually and a contact sheet for rhythm.
- Check text wrapping, clipping, font substitution, and minimum readable size.
- Check master/layout inheritance and speaker notes.
- Check that editable text and objects remain editable when required.
- Fix all unintended overlap warnings.

### Google Slides

- Verify the native imported deck, not only the source PPTX.
- Check font substitutions and image crops after import.
- Check notes, links, and editable elements.

## Review procedure

Use this sequence:

1. Judge the narrative.
2. Judge the first read and recall hook.
3. Judge hierarchy and typography.
4. Judge icon and image roles.
5. Judge motion.
6. Judge technical fit and export quality.

Return a compact table:

| Signal | Works | Needs change |
| --- | --- | --- |
| First read | Immediate interpretation | Ambiguity or mistaken object |
| Claim | Repeatable takeaway | Topic label or unsupported point |
| Recall hook | Memorable relationship | Generic metaphor |
| Hierarchy | Dominant subject/action | Competing scale, color, or detail |
| Typography | Clear semantic roles | Tight, heavy, arbitrary, or inconsistent |
| Icons | Recognition and rhythm | Clutter or unnecessary dryness |
| Motion | Clear causal action | Slow or decorative movement |
| Distance | Survives thumbnail/projector | Thin lines or collapsed detail |

Lead with the actual judgment. Recommend changing one major variable at a time.
Preserve anything the user explicitly approved.
