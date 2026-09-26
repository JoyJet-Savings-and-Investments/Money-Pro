# City-Money Pro v20

**Personal Investment & Goal Tracking Dashboard**  
Paper-trading simulator — no real money, no brokerage accounts.

---

## Dashboard (merged layout)

Single **Wealth Summary** card combines:

| Field | Source |
|--------|--------|
| **Net Worth** | Available Cash + Market Value |
| **Available Cash** | Current spendable balance |
| **Total Deposited** | Sum of all Deposit transactions |
| **Total Invested** | Sum of all Invest transactions |
| **Invested (Cost)** | Average cost basis of holdings |
| **Market Value** | Live mark-to-market of holdings |
| **Profit Earned** | Unrealized + Realized P&L |

Seeded Main Dashboard (first load):

- Available Cash: **$190**
- Invested cost basis: **$300** (BTC · ETH · AAPL · TSLA)
- Realized profit: **$40**
- Total deposited (history): **$340**
- Total invested (history): **$300**
- Latest activity: **2026-09-18** (+$150 deposit, $150 into TSLA)

---

## Features

- Sign in (email **or** username) or **Continue as Guest**
- Multi-asset: Crypto · Stocks · Mutual Funds
- Live crypto prices (CoinGecko) + offline fallback
- Goal tracking with progress bars
- Add Money / Withdraw (blocked until $10,000 available)
- Buy & Sell · average cost basis · split P&L
- Price alerts · CSV export · dark/light theme
- Fully responsive + hamburger nav

---

## Files

```
index.html
styles.css
app.js
README.md
```

Open `index.html` or deploy the folder to GitHub Pages / Vercel.

> Login credentials are **not** listed here or on the sign-in screen.

---

## License

MIT
