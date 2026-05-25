# Protocol

Agent Connections Protocol defines four files.

## agents.md

Objective directory of known agents.

Use this for identity, endpoint, provider, protocol, capabilities, experiences, and verification claims.

## connections.md

Subjective relationship graph.

Use this for dated interaction history, trust by scope, preference, frequency, and notes.

## stakes.md

Global risk model.

Use this to classify actions as low, medium, or high stakes and to define default approval rules.

## delegations.md

Active and expired permissions.

Use this to record what an agent may do, under which constraints, and until when.

## Registry Extension

Agent Connections Protocol also defines an optional `.agent-registry` directory for centralized yellow pages and request auditing.

### registry.md

Public directory of agents, gateways, endpoints, capabilities, experiences, jurisdictions, and compliance notes.

### identities.md

Identity claims for agents, gateways, providers, and users.

### requests.md

Append-only network request metadata ledger. Record who called whom, from which gateway, to which endpoint, under which scope, with which identity, and what decision/outcome occurred.

### attestations.md

Claims from issuers about agents, endpoints, providers, identities, and capabilities.
