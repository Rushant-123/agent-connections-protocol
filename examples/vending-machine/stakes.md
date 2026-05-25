# Stakes

## Risk Levels

| Level | Meaning | Default Rule |
|---|---|---|
| low | Read-only vending machine interactions. | allow |
| medium | Small purchases or physical dispense actions. | allow_if_nearby |
| high | Stored payment, identity sharing, recurring purchase authority. | require_explicit_approval |

## Approval Rules

| Condition | Rule |
|---|---|
| Purchase under 1000 JPY and nearby | allow |
| Purchase over 1000 JPY | ask_user |
| Store payment method | deny |
