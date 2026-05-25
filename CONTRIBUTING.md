# Contributing

Contributions should keep the protocol readable by both humans and agents.

## Rules

- Keep Markdown as the source of truth.
- Prefer examples over abstract terminology.
- Do not add a server requirement to the core protocol.
- Do not add a database requirement to the core protocol.
- Add evidence before changing trust levels.
- Keep scope-specific trust separate from global reputation.
- Log request metadata without private payload bodies unless a deployment explicitly opts in.
- Treat registry listings as discovery evidence, not automatic trust.

## Local Checks

```bash
npm test
npm run validate
```
