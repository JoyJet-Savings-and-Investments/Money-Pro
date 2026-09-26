# JoyJet City Money v21

**JoyJet Savings & Investments** — paper-trading dashboard for personal wealth tracking.

Production-ready static app for GitHub Pages. No backend required.

---

## What’s fixed vs CITY-MONEY-2.0

| Issue on live site | Fix in v21 |
|--------------------|------------|
| Brand still “City-Money Pro” | Full **JoyJet** rebrand |
| Allocation chart lists all 18 assets (most zero) | Doughnut shows **only held positions** |
| Cluttered legend | Compact bottom legend, filtered zeros |
| Theme key shared with old builds | Isolated `joyjet_theme` / `joyjet_cm_v21` storage |
| CSV filename generic | `joyjet-*.csv` |
| Weak product identity | JoyJet naming across UI, title, footer |

---

## Features

- Sign in or **Continue as Guest**
- Merged wealth summary: Net Worth · Cash · Deposited · Invested · Market · P&L
- Crypto + Stocks + Mutual Funds
- Live crypto prices (CoinGecko) + offline fallback
- Goals with progress bars · Alerts · CSV export
- Dark / light theme · Responsive + hamburger nav

---

## Seeded Main Dashboard

| Metric | Value |
|--------|--------|
| Available Cash | $190 |
| Invested (cost) | $300 |
| Realized profit | $40 |
| Total deposited (history) | $340 |
| Total invested (history) | $300 |
| Holdings | BTC · ETH · AAPL · TSLA |
| Latest activity | 2026-09-18 |

---

## Deploy (GitHub Pages)

1. Create public repo (e.g. `CITY-MONEY-2.0`)
2. Upload `index.html`, `styles.css`, `app.js`, `README.md` to root
3. **Settings → Pages → Deploy from branch `main` / root**
4. Open `https://YOUR_USER.github.io/REPO/`

---

## Files

```
index.html
styles.css
app.js
README.md
```

---

## License

MIT
