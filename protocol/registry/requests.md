# Network Requests

`.agent-registry/requests.md` is an append-only metadata ledger for network requests between agents.

The ledger should answer:

- who made the request
- which gateway sent it
- which agent received it
- which endpoint was called
- which scope was requested
- which identity/proof was attached
- whether policy allowed it
- what outcome occurred

By default, log metadata only. Do not log message bodies unless the deployment explicitly opts into payload capture.
