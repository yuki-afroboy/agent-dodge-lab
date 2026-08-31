# Agent Dodge Lab Project Instructions

## Project purpose

Agent Dodge Lab is a deliberately simple browser game used to learn safe, evidence-based AI-agent development.

The development workflow is the primary subject. Keep the game technically simple and avoid unnecessary abstractions, dependencies, or tooling.

The complete learning sequence is documented in `docs/learning-roadmap.md`. Read it when a task concerns the roadmap, tool adoption, or the Claude Code and Codex learning plan. Do not load it for unrelated small tasks.

## Important files

- `index.html`: Game page, canvas, and UI
- `style.css`: Visual styling
- `game.js`: Movement, collision, scoring, and game state
- `.nojekyll`: Disables Jekyll processing for GitHub Pages
- `.github/workflows/ci.yml`: Required CI workflow
- `README.md`: Short project introduction
- `docs/learning-roadmap.md`: Full learning roadmap and adoption policy

## Development workflow

Use this workflow for every repository change:

1. Start from a GitHub Issue with a clear goal and definition of done.
2. Create one topic branch from `main`, normally named `<issue-number>-<slug>`.
3. Make only the changes required by the Issue.
4. Inspect `git status` and the relevant diff.
5. Run relevant local validation.
6. Commit and push the topic branch.
7. Open a pull request into `main` and link the Issue with `Closes #<number>`.
8. Confirm the required `validate` check passes.
9. Review the changed files before merging.
10. After merge, pull `main` and delete the local and remote topic branches.

Do not push changes directly to `main`.

Do not merge pull requests or delete remote branches unless the user explicitly requests that action.

## Validation

`.github/workflows/ci.yml` is the source of truth for CI.

The required GitHub Actions job is named `validate`. It checks:

- `index.html`, `style.css`, and `game.js` exist
- `index.html` references `style.css` and `game.js`
- `game.js` has valid JavaScript syntax

When JavaScript changes, run `node --check game.js`.

Before claiming completion:

- Inspect `git status`
- Inspect the relevant diff
- Run applicable validation
- Report the commands run and their results

Do not treat an implementation claim as proof that the work is correct.

## Protected main branch

The active `Protect main` Ruleset requires:

- Changes to reach `main` through a pull request
- The `validate` status check to pass
- Force pushes to be blocked
- Branch deletion to be restricted

Required approvals are currently set to zero.

## Change guidelines

- Prefer the smallest change that satisfies the Issue.
- Preserve the static HTML, CSS, and JavaScript architecture unless the Issue requires otherwise.
- Do not add dependencies without explaining and justifying them.
- Update `docs/learning-roadmap.md` when chapter progress or the learning sequence changes.
- State uncertainty when repository files do not prove an external GitHub setting.