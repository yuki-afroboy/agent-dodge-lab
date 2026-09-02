# Agent Dodge Lab Learning Roadmap

## Purpose

Agent Dodge Lab is a practical project for learning how modern AI coding agents work.

The primary goal is not to build the game as quickly as possible. The game is a controlled learning environment for understanding Git, GitHub, CI, Claude Code, Codex, and multi-agent development.

The final goal is to be able to explain and design this workflow:

```text
Human
  ↓
Claude Code Lead
  ├─ Claude subagents
  ├─ Claude reviewer
  └─ Codex engineer
        ↓
Git and GitHub
        ↓
Pull request
        ↓
Automated tests and review
        ↓
Merge
        ↓
Deployment
```

## Learning approach

- Learn one concept at a time.
- Explain what happens behind every important action.
- Perform foundational workflows manually before delegating them to AI.
- Use Issues to describe goals and definitions of done.
- Use a separate branch for each task.
- Inspect `git status`, diffs, tests, and CI results instead of trusting completion claims.
- Complete the full workflow: Issue → Branch → Commit → Push → Pull Request → CI → Review → Merge → Cleanup.
- Keep the game technically simple so the development workflow remains the main subject.
- Introduce advanced tools only after their underlying problem has been experienced.

## Research and adoption policy

CLAUDE.md files, Skills, plugins, Hooks, agents, and other development tools will not be adopted only because they are popular.

Candidates will be evaluated in this order:

1. Official Anthropic, OpenAI, and GitHub documentation
2. Official marketplaces and first-party examples
3. Established open-source projects
4. Proven real-world examples
5. Fit, security, maintainability, and complexity review
6. Comparison or evaluation against the existing workflow
7. Adoption only when the tool provides measurable value

Large collections of Skills or agents will not be installed without understanding their purpose.

## Roadmap

### Chapter 0 — Foundations

Learn:

- Local and cloud environments
- Files and folders
- Repository
- Git and GitHub
- The difference between a storage location and a working environment

### Chapter 1 — Git and GitHub workflow

Build the minimum playable version of Agent Dodge Lab.

Learn:

- Repository
- Working tree
- Staging area
- Commit
- Branch
- Push and pull
- Issue
- Pull request
- Review and merge
- Branch cleanup

### Chapter 2 — GitHub Pages

Publish the game on the web.

Learn:

- Static websites
- Deployment
- Build
- GitHub Pages
- The relationship between `main` and the published site

### Chapter 3 — GitHub Actions and CI

Create automated validation for every pull request and push to `main`.

Learn:

- Workflow
- YAML
- Trigger
- Runner
- Job
- Step
- Exit code
- Logs
- Required status checks
- Rulesets and protected branches

Validation includes:

- Required game files exist
- HTML references CSS and JavaScript
- JavaScript syntax is valid
- The `validate` check must pass before merging

### Chapter 4 — CLAUDE.md

Introduce project instructions for Claude Code.

Compare:

- Development without CLAUDE.md
- Development with a focused CLAUDE.md

Keep permanent instructions concise and move task-specific procedures elsewhere.

### Chapter 5 — Skills

Learn how Skills provide reusable procedures only when needed.

Evaluate established approaches such as:

- Brainstorming
- Planning
- Test-driven development
- Systematic debugging
- Verification before completion
- Code review

Superpowers is a candidate, not an automatic dependency.

### Chapter 6 — Skill Creator and evaluation

Create a project-specific Skill, such as a web-game testing procedure.

Compare the workflow with and without the Skill using evidence such as:

- Task success
- Number of correction cycles
- Unnecessary changes
- Test results
- Token or time cost

### Chapter 7 — Hooks

Introduce deterministic automation for events such as:

- Formatting after file changes
- Running tests before completion
- Blocking unsafe commands
- Sending completion notifications

Learn the difference between optional procedures and enforced automation.

### Chapter 8 — Subagents

Create specialized agents such as:

```text
Lead
├─ Gameplay specialist
├─ Test specialist
└─ Reviewer
```

Learn task delegation, isolated context, and result integration.

### Chapter 9 — Worktrees and parallel development

Run independent tasks in separate Git worktrees.

Learn:

- Why simultaneous edits can conflict
- How branches and worktrees isolate work
- How multiple agents can work safely in parallel
- When a branch must be updated with the latest `main`

### Chapter 10 — MCP

Learn how an AI agent connects to external tools and services through the Model Context Protocol.

Understand:

```text
Claude Code
    ↓
MCP
    ↓
External tool or service
```

### Chapter 11 — Codex

Introduce Codex as an engineer, reviewer, tester, or second-opinion agent.

Learn:

- Task handoff
- Context selection
- Tool permissions
- Avoiding duplicated work
- Efficient division of responsibility

### Chapter 12 — Claude Code and Codex collaboration

Build the final collaboration model:

```text
Human
  │
Claude Code Lead
  │
  ├─ Claude gameplay agent
  ├─ Claude reviewer
  │
  └─ Codex engineer
        ├─ Implementation
        ├─ Tests
        └─ Second opinion
```

Complete the workflow with:

```text
Issue
↓
Plan
↓
Implementation
↓
Automated verification
↓
Independent review
↓
Pull request
↓
Required CI
↓
Merge
↓
Deployment
```

## Current progress

- Chapters 0 through 5 are complete.
- Chapter 4 introduced and evaluated a project-level `CLAUDE.md`.
- Chapter 5 researched reusable Skills, evaluated Superpowers without installing it, and selected a project-specific systematic debugging procedure for Chapter 6.
- Chapters 6 through 12 are pending.

This roadmap is a living document. It should be updated when the learning sequence changes or when a tool is adopted based on evidence.
