# Deck source schema

Read this reference when generating a deck from structured source.

Use JSON, YAML or TypeScript as appropriate, but preserve these semantics:

```json
{
  "meta": {
    "title": "Deck title",
    "audience": "Who is listening",
    "communicationChange": "By the end, the audience should…",
    "aspectRatio": "16:9",
    "theme": "tapir-blue"
  },
  "tokens": {
    "background": "#F7F5EF",
    "ink": "#111111",
    "muted": "#8B8982",
    "accent": "#159BE8",
    "headingFont": "Inter, PingFang SC, sans-serif",
    "bodyFont": "Inter, PingFang SC, sans-serif"
  },
  "slides": [
    {
      "id": "01-cover",
      "role": "cover",
      "layout": "cover-premise",
      "claim": "白板，是思维的缓冲带",
      "lines": [
        "白板",
        { "text": "是思维的缓冲带", "accent": true }
      ],
      "visual": {
        "pattern": "pass",
        "subject": "unformed thoughts",
        "support": "blue buffer",
        "anchor": "horizontal-center-path",
        "result": "thoughts leave as ordered lines"
      },
      "motion": {
        "beats": [
          { "label": "approach", "delayMs": 0 },
          { "label": "cross", "delayMs": 650 },
          { "label": "resolve", "delayMs": 1120, "selected": true }
        ],
        "durationMs": 1800
      },
      "assets": [],
      "notes": "Open with the gap between thinking and speaking."
    }
  ]
}
```

## Required slide fields

- `id`: stable and unique.
- `role`: one page-role contract.
- `layout`: a named structural variant.
- `claim`: one audience-facing assertion or question.
- `lines`: explicit semantic line breaks for display text. A line may be a
  string or `{ "text": "...", "accent": true }` when the complete semantic
  phrase should carry the focal color.
- `visual.pattern`: one primary visual action.
- `visual.anchor`: a named shared geometric anchor.

## Optional slide fields

- `evidence`: source, statistic, quote or asset provenance.
- `icons`: normally zero to three semantic icons and their roles; allow three
  to six when the set itself is the dominant route, taxonomy or sequence.
- `motion`: beat map, duration and reduced-motion result.
- `assets`: image, video, diagram or product screenshot references.
- `overflow`: set to `intentional` only for a deliberately cropped motif that
  has been visually inspected.
- `notes`: speaker contribution, caveats and transitions.

## Planning table

Before implementation, produce:

| # | Role | Claim | Layout | Pattern | Anchor | Evidence |
| --- | --- | --- | --- | --- | --- | --- |

Reject the plan when:

- multiple adjacent slides share the same role, layout and pattern without a
  deliberate rhythm;
- a slide has no visual anchor;
- a title is only a topic label;
- body content is required to understand the main relationship;
- the planned role and content density conflict.

For a visible repeated action, use `motion.beats` rather than describing the
repetition only in notes. Each beat accepts `label`, optional `icon`,
`delayMs`, and `selected`. Keep two to five beats and compress later delays
when the audience already understands the rule.
