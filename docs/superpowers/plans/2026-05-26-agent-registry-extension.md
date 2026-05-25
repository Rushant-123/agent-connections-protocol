# Agent Registry Extension Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a centralized Markdown-first yellow pages and request audit extension to Agent Connections Protocol.

**Architecture:** Keep `.agent-connections` as local subjective trust memory. Add `.agent-registry` as the shared directory and metadata ledger. Extend the zero-dependency CLI with registry initialization, validation, and request logging.

**Tech Stack:** Node.js 18+, Markdown templates, JSON Schema, `node:test`.

---

### Task 1: Registry Protocol

**Files:**
- Create: `templates/.agent-registry/registry.md`
- Create: `templates/.agent-registry/identities.md`
- Create: `templates/.agent-registry/requests.md`
- Create: `templates/.agent-registry/attestations.md`
- Create: `protocol/registry/registry.md`
- Create: `protocol/registry/identities.md`
- Create: `protocol/registry/requests.md`
- Create: `protocol/registry/attestations.md`

- [x] **Step 1: Add Markdown templates**
- [x] **Step 2: Add protocol docs**

### Task 2: Registry CLI

**Files:**
- Modify: `bin/acp.js`

- [x] **Step 1: Add `registry init`**
- [x] **Step 2: Add `registry validate`**
- [x] **Step 3: Add `registry log-request`**

### Task 3: Registry Tests And Docs

**Files:**
- Modify: `test/acp.test.js`
- Modify: `README.md`
- Modify: `docs/protocol.md`

- [x] **Step 1: Add tests**
- [x] **Step 2: Update docs**
- [x] **Step 3: Run verification and push**
