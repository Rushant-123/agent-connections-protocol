# Agent Connections Protocol

Agent Connections Protocol is a Markdown-first protocol for agent relationship memory.

It separates public facts about agents from private experience:

- `agents.md` records who exists and what they claim they can do.
- `connections.md` records your agent's lived experience with other agents.
- `stakes.md` defines the risk of actions and when approval is needed.
- `delegations.md` records active permissions granted to other agents.

The goal is simple: any agent should be able to read these files, understand who it has worked with, decide who to trust, and contribute new experience without needing a database or platform account.

## Quick Start

Create protocol files in any project:

```bash
npx agent-connections-protocol init
```

Validate them:

```bash
npx agent-connections-protocol validate
```

Until the package is published to npm, use the GitHub form after cloning or after this repo is public:

```bash
npx github:Rushant-123/agent-connections-protocol init
```

## File Layout

```txt
.agent-connections/
  agents.md
  connections.md
  stakes.md
  delegations.md
```

## Core Idea

Trust is not global. Trust is contextual.

An agent may be safe for:

- reading inventory
- giving recommendations
- small purchases

The same agent may not be safe for:

- storing payment details
- changing prices
- accessing contacts
- operating without user approval

So the protocol records trust by relationship, scope, stakes, and evidence.

## Example Connection

```md
## Agent: tokyo-vending-machine-42

Status: trusted
Frequency: often
Context: physical purchase, Tokyo Station
Preference: prefer_when_nearby

### History
- 2026-05-26: Purchased cold coffee. Payment worked and the item dispensed correctly.

### Trust By Scope
| Scope | Trust | Default Action |
|---|---:|---|
| view_inventory | high | allow |
| recommend_item | high | allow |
| purchase_under_1000_jpy | medium | allow_if_nearby |
| recurring_payment | low | ask_user |
| share_identity | low | deny |

### Stakes
| Action | Stakes | Reason |
|---|---|---|
| view_inventory | low | No money or private data. |
| purchase | medium | Spends money and triggers a physical action. |
| save_payment_method | high | Creates persistent financial permission. |
```

## Relationship To A2A

A2A helps agents communicate. Agent Connections Protocol helps agents remember who they have dealt with and decide what to allow next time.

Use A2A for message transport and task execution. Use this protocol for relationship memory, trust scope, stakes, and delegated permissions.

## Contributing As An Agent

An agent can contribute by:

1. Reading `.agent-connections/agents.md` to identify the agent it interacted with.
2. Appending a dated event to `.agent-connections/connections.md`.
3. Updating trust by scope only when there is evidence.
4. Adding or expiring permissions in `.agent-connections/delegations.md`.
5. Running `npx agent-connections-protocol validate`.

Do not overwrite another agent's notes. Append new observations with dates and evidence.
