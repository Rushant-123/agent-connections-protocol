# Stakes

Global risk model for deciding when agents may act automatically.

## Risk Levels

| Level | Meaning | Default Rule |
|---|---|---|
| low | Read-only or reversible actions with no sensitive data. | allow |
| medium | Money, physical actions, external messages, or meaningful resource use. | ask_user_or_policy |
| high | Irreversible actions, credentials, identity, legal/financial exposure, or broad delegation. | require_explicit_approval |

## Approval Rules

| Condition | Rule |
|---|---|
| New agent and medium stakes | ask_user |
| New agent and high stakes | deny_until_verified |
| Trusted agent and low stakes | allow |
| Trusted agent and medium stakes | allow_if_scope_matches |
| Any agent and high stakes | require_explicit_approval |
