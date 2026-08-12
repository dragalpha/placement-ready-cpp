# Problem Hints and Examples Plan

## Goal
Add a compact hint and example section to each problem so learners can understand the idea without leaving the app. This makes the website more useful for self-learning, revision, and interview preparation.

## Why this feature matters
- Helps beginners understand the problem quickly.
- Reduces time spent searching for solutions elsewhere.
- Makes the app feel like a guided learning tool instead of just a list of problems.
- Keeps the experience simple and game-like while improving educational value.

## Proposed data structure
Each problem entry in `data/problems.js` should support:
- `hint`: a short clue or idea
- `example`: a small example block with input/output or sample values

Example structure:

```js
{
  id: 1,
  name: "Hello World",
  filename: "01_hello_world.cpp",
  xp: 50,
  difficulty: "Easy",
  module: "Basics",
  hint: "Use cout to print the required message exactly.",
  example: {
    input: "-",
    output: "Hello World"
  }
}
```

## UI plan
On the mission page, below the problem description, add:
- a small section titled "Hint"
- a small section titled "Example"
- optional collapsible behavior to keep the page clean

Suggested layout:
- Hint card with one or two sentences
- Example card with:
  - Input
  - Output
  - maybe a brief explanation

## Scope
### Phase 1
Add the structure and render it for the first batch of problems.

### Phase 2
Fill realistic hints and sample examples for early-level problems.

### Phase 3
Continue filling the remaining 300-problem list in batches.

## Implementation approach
1. Update `data/problems.js` with `hint` and `example` fields.
2. Update `app.js` to read and render them on the mission page.
3. Keep text short and helpful so each problem remains readable.
4. Use consistent formatting across all modules.

## Quality guidelines
- Hints should be short and concept-focused, not full solutions.
- Examples should be small and readable.
- Avoid spoilers for harder problems.
- Keep style consistent with the RPG dashboard design.

## Deliverable
This feature should make every mission page more helpful by showing:
- a clue to guide thinking,
- a tiny sample to clarify the objective,
- and a smoother learning flow for placement practice.

## Next action
Start by adding the data structure and rendering support for the early problems (1–50), then expand progressively.
