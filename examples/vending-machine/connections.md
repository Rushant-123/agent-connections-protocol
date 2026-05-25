# Connections

## Agent: tokyo-vending-machine-42

Status: trusted
Frequency: often
Context: physical purchase, Tokyo Station
Preference: prefer_when_nearby

### History
- 2026-05-26: Purchased cold coffee. Payment worked and the item dispensed correctly.
- 2026-05-26: Asked for inventory. Response matched visible stock.

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

### Notes
Reliable so far. Do not allow recurring purchases without explicit confirmation.
