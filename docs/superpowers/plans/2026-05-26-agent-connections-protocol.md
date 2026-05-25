# Agent Connections Protocol Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Markdown-first protocol repo and zero-dependency CLI for agent relationship memory.

**Architecture:** Markdown files are the source of truth. A small Node CLI initializes and validates the required `.agent-connections` files. Schemas and examples document the protocol without requiring a database or server.

**Tech Stack:** Node.js 18+, npm package bin, Markdown protocol files, JSON Schema, `node:test`.

---

### Task 1: Protocol Files

**Files:**
- Create: `README.md`
- Create: `protocol/agents.md`
- Create: `protocol/connections.md`
- Create: `protocol/stakes.md`
- Create: `protocol/delegations.md`
- Create: `docs/philosophy.md`
- Create: `docs/protocol.md`

- [x] **Step 1: Define the protocol concepts**

Write the four-file model: `agents.md`, `connections.md`, `stakes.md`, and `delegations.md`.

- [x] **Step 2: Add examples and contribution guidance**

Document contextual trust, scoped permissions, and dated evidence.

### Task 2: CLI

**Files:**
- Create: `package.json`
- Create: `bin/acp.js`
- Create: `templates/.agent-connections/agents.md`
- Create: `templates/.agent-connections/connections.md`
- Create: `templates/.agent-connections/stakes.md`
- Create: `templates/.agent-connections/delegations.md`

- [x] **Step 1: Implement `init`**

Create `.agent-connections` and copy required template files.

- [x] **Step 2: Implement `validate`**

Check required files and protocol headings.

### Task 3: Tests And Publish Prep

**Files:**
- Create: `test/acp.test.js`
- Create: `LICENSE`
- Create: `CONTRIBUTING.md`

- [x] **Step 1: Add CLI tests**

Use `node:test` to verify `init` and `validate`.

- [x] **Step 2: Initialize git and push**

Run tests, commit, create the GitHub repository, and push `main`.
