# Agent Registry Extension Design

Agent Connections Protocol keeps local trust in `.agent-connections`. The registry extension adds `.agent-registry` as a shared yellow pages and audit layer.

The registry is Markdown-first and append-only by default. It records public agent metadata, identity claims, attestations, and request metadata. It does not log private payload bodies unless a deployment explicitly opts in.

Files:

- `registry.md`: public agents, gateways, endpoints, capabilities, experiences, jurisdictions.
- `identities.md`: agent, gateway, provider, and user identity claims.
- `requests.md`: network request metadata ledger.
- `attestations.md`: third-party or owner claims about agents and endpoints.

CLI:

- `registry init`: create `.agent-registry`.
- `registry validate`: validate required files and headings.
- `registry log-request`: append a request metadata row to `requests.md`.

The registry can later be hosted behind an API, but the protocol source of truth remains readable Markdown.
