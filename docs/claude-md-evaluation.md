# CLAUDE.md Evaluation

## Purpose

Evaluate whether a concise project-level `CLAUDE.md` helps Claude Code understand Agent Dodge Lab more quickly and consistently.

## Test conditions

The same prompt was used in fresh Claude Code sessions before and after adding `CLAUDE.md`.

Auto-memory was disabled with:

`$env:CLAUDE_CODE_DISABLE_AUTO_MEMORY = "1"`

Prompt:

> Do not modify any files. Explain this repository's purpose, important files, change workflow, validation commands, and merge requirements. If uncertain, say so.

## Baseline: without CLAUDE.md

Observed results:

- Claude Code read 4 files and ran 4 shell commands.
- The response took approximately 37 seconds.
- It correctly identified the repository as a learning project for AI-assisted development.
- It discovered the important files, Git workflow, and CI validation by inspecting the repository.
- It correctly stated that the live GitHub Ruleset could not be verified from local repository files alone.
- Some roadmap progress information was stale, describing Ruleset validation as still in progress.

## After adding CLAUDE.md

Observed results:

- `/memory` confirmed that project instructions were loaded from `./CLAUDE.md`.
- Claude Code answered without additional file reads or shell commands being shown.
- The response took approximately 9 seconds.
- It immediately identified the project purpose and important files.
- It accurately described the Issue, Branch, Commit, Push, Pull Request, CI, Review, Merge, and cleanup workflow.
- It identified the required `validate` CI check and the documented `Protect main` Ruleset requirements.
- It preserved an important uncertainty statement: the live GitHub Ruleset could not be independently verified from repository files alone.

## Comparison

The project-level `CLAUDE.md` improved:

- Speed
- Consistency
- Awareness of the required development workflow
- Awareness of validation and merge requirements
- Appropriate handling of uncertainty

The comparison is observational rather than a strict performance benchmark because AI responses may vary between sessions.

## Conclusion

A concise project-level `CLAUDE.md` gives Claude Code reliable starting context without requiring it to rediscover the same repository conventions in every session.

The instructions improve efficiency, but they do not replace evidence. Claude Code should still inspect relevant diffs, run applicable validation, and report uncertainty when repository files do not prove an external GitHub setting.