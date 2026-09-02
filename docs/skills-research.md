# Skills Research

## Purpose

Issue #10 asks for research and evaluation of reusable Skills before adopting any of them.

Following the research and adoption policy in `docs/learning-roadmap.md`, Skills are not adopted for popularity. Each candidate is evaluated against official documentation first, then against this project's actual constraints (static HTML/CSS/JS, no dependencies, existing CLAUDE.md workflow).

## Official Claude Code Skills

Source: https://code.claude.com/docs/en/skills

- **Problem solved**: avoids retyping the same instructions, checklists, or multi-step procedures into chat, and keeps long reference material out of context until it is actually needed.
- **Difference from a plain prompt or CLAUDE.md**: CLAUDE.md content is always loaded into context. A Skill's description is always loaded, but its body only loads when the Skill is invoked, so long procedures cost almost nothing until used.
- **SKILL.md structure**: YAML frontmatter (`---` block) plus a Markdown body. Only `description` is recommended; all other fields are optional. The frontmatter tells Claude when to use the Skill, the body is the instructions Claude follows once invoked.
- **Scope**:
  - Personal Skill: `~/.claude/skills/<name>/SKILL.md`, available across all of a user's projects.
  - Project Skill: `.claude/skills/<name>/SKILL.md`, available only in that repository.
  - Plugin Skill: `<plugin>/skills/<name>/SKILL.md`, available wherever the plugin is enabled.
- **Invocation**: by default Claude can invoke a Skill automatically when relevant, and a user can invoke it manually with `/skill-name`. `disable-model-invocation: true` restricts a Skill to manual use only; `user-invocable: false` restricts it to Claude only.

## Candidate Approaches

Comparison of six established approaches, based on `obra/superpowers` as a reference implementation (see Superpowers Evaluation below). None of these are installed; this is a comparison only.

| Approach | Purpose | Fit for Agent Dodge Lab | Cost/constraint today |
|---|---|---|---|
| Brainstorming | Force explicit design discussion and approval before implementation starts | Overlaps with the existing Issue-first workflow; useful concept but the reference implementation's approval-gate and spec-file process is heavier than this project's scale | No new dependency, but adds process overhead disproportionate to small game changes |
| Planning | Turn an approved design into a detailed, placeholder-free implementation plan | Reinforces "make only the changes required by the Issue," but reference implementation assumes multi-file, multi-task work | Overhead not justified yet for a small, mostly single-file codebase |
| Test-driven development | Write a failing test before writing implementation code | Sound general practice, but this project has no automated test command and no repeatable way to run a behavior test yet | Before adopting TDD, a way to observe a test fail and pass must be designed first; whether that requires an external dependency is undecided |
| Systematic debugging | Find root cause before attempting a fix; avoid symptom-only patches | Directly usable with the current stack; no tooling change needed | No new dependency; can be written as project text/process only |
| Verification before completion | Require fresh command output as evidence before claiming success | Directly usable, but overlaps heavily with existing CLAUDE.md rules (`git status`, diff, `node --check`, report commands and results before claiming completion) | Low cost, but largely duplicates what CLAUDE.md already enforces |
| Code review | Dispatch an isolated reviewer (subagent) with precise context instead of self-reviewing | Conceptually useful, but reference implementation assumes subagent dispatch, which this project has not yet introduced (planned for Chapter 8) | Requires subagent workflow understanding not yet covered |

## Superpowers Evaluation

Source: https://github.com/obra/superpowers

- Superpowers is not a single Skill. It is a methodology built from many composable Skills (14 skill directories seen, including `brainstorming`, `writing-plans`, `test-driven-development`, `systematic-debugging`, `verification-before-completion`, `requesting-code-review`, `subagent-driven-development`, `using-git-worktrees`, and others).
- It uses more than Skills: a `hooks/` directory (`hooks.json`, `session-start`, `run-hook.cmd`) for automation, subagent dispatch (`subagent-driven-development`, `dispatching-parallel-agents`, code review dispatch), and Git worktrees (`using-git-worktrees`) for isolated workspaces.
- License: MIT (copyright Jesse Vincent, 2025), per the repository's `LICENSE` file.
- Telemetry/network: by default, the brainstorming Skill's optional visual companion feature loads a logo from the project's own website, which includes the Superpowers version in use. This can be disabled via `SUPERPOWERS_DISABLE_TELEMETRY` or Claude Code's own telemetry opt-out.
- Benefit of adopting the whole package: a large set of pre-written, interlocking procedures (design gates, planning, TDD, debugging, review, worktrees) usable across many agent harnesses, not just Claude Code.
- Risk of adopting the whole package: introduces multiple concepts at once (design gates, TDD, subagent review, worktrees) that this project has deliberately sequenced across separate chapters; includes TDD workflows that require a repeatable test command, which this project does not yet have; the upstream repository contains configuration for many other agent harnesses (Cursor, Devin, Codex, etc.), but whether installing the Claude Code plugin installs or enables any of that is unknown, since the plugin's packaged contents were not inspected; makes a default outbound network call for one feature; requires ongoing tracking of upstream changes.
- Decision: Superpowers is not installed for this Issue. It is treated as a reference for ideas, not as a dependency.

## Decision for Chapter 6

Chapter 6 will not install Superpowers as a whole. Instead, it will use the ideas behind Superpowers' `systematic-debugging` approach to write a small, project-specific systematic debugging procedure as a Project Skill (`.claude/skills/`), tailored to this browser game's HTML/CSS/JS stack.

Reasons:

- Works with the current HTML/CSS/JavaScript setup without changes to the stack.
- Requires no new dependency (no test runner, no subagents, no worktrees).
- Matches the existing preference for finding the root cause before making a minimal fix.
- Its effect can be compared with and without the Skill using evidence such as number of fix attempts, unnecessary changes, success rate, and time, per the Chapter 6 plan in `docs/learning-roadmap.md`.
- `verification-before-completion` was not chosen for this Skill because it substantially duplicates rules already enforced by the existing CLAUDE.md (running `git status`, diffs, and `node --check`, and reporting evidence before claiming completion).

## Limitations

- Only six Superpowers Skill files were read for this research: `brainstorming`, `writing-plans`, `test-driven-development`, `systematic-debugging`, `verification-before-completion`, and `requesting-code-review`. Other Skills in the repository (`using-superpowers`, `writing-skills`, `subagent-driven-development`, `using-git-worktrees`, `dispatching-parallel-agents`, `finishing-a-development-branch`, `receiving-code-review`) were not read.
- Content was retrieved with an automated web-fetch tool that summarizes fetched pages; some quotes above are paraphrased from that summary rather than a full manual read of the raw file, so exact wording in the source may differ slightly.
- `package.json`, CI configuration, and the `hooks.json`/`session-start` contents in the Superpowers repository were not inspected in detail.
- No Skill or plugin was installed, run, cloned, or executed as part of this research. All conclusions are based on reading documentation and repository contents only.
