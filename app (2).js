/* ============================================================
   City-Money Pro v20 — Merged Application Logic
   ============================================================ */

(function () {
  'use strict';

  const ASSETS = [
    { symbol: 'BTC',  id: 'bitcoin',     name: 'Bitcoin',              class: 'Crypto' },
    { symbol: 'ETH',  id: 'ethereum',    name: 'Ethereum',             class: 'Crypto' },
    { symbol: 'BNB',  id: 'binancecoin', name: 'BNB',                  class: 'Crypto' },
    { symbol: 'SOL',  id: 'solana',      name: 'Solana',               class: 'Crypto' },
    { symbol: 'XRP',  id: 'ripple',      name: 'XRP',                  class: 'Crypto' },
    { symbol: 'ADA',  id: 'cardano',     name: 'Cardano',              class: 'Crypto' },
    { symbol: 'DOGE', id: 'dogecoin',    name: 'Dogecoin',             class: 'Crypto' },
    { symbol: 'AVAX', id: 'avalanche-2', name: 'Avalanche',            class: 'Crypto' },
    { symbol: 'DOT',  id: 'polkadot',    name: 'Polkadot',             class: 'Crypto' },
    { symbol: 'LINK', id: 'chainlink',   name: 'Chainlink',            class: 'Crypto' },
    { symbol: 'AAPL', id: 'aapl',        name: 'Apple',                class: 'Stock' },
    { symbol: 'MSFT', id: 'msft',        name: 'Microsoft',            class: 'Stock' },
    { symbol: 'GOOGL',id: 'googl',       name: 'Alphabet',             class: 'Stock' },
    { symbol: 'TSLA', id: 'tsla',        name: 'Tesla',                class: 'Stock' },
    { symbol: 'AMZN', id: 'amzn',        name: 'Amazon',               class: 'Stock' },
    { symbol: 'VTSAX',id: 'vtsax',       name: 'Vanguard Total Stock', class: 'Mutual Fund' },
    { symbol: 'VFIAX',id: 'vfiax',       name: 'Vanguard 500 Index',   class: 'Mutual Fund' },
    { symbol: 'FXAIX',id: 'fxaix',       name: 'Fidelity 500 Index',   class: 'Mutual Fund' }
  ];

  const SYMBOLS = ASSETS.map(a => a.symbol);
  const ID_MAP = Object.fromEntries(ASSETS.map(a => [a.symbol, a.id]));
  const CLASS_MAP = Object.fromEntries(ASSETS.map(a => [a.symbol, a.class]));
  const NAME_MAP = Object.fromEntries(ASSETS.map(a => [a.symbol, a.name]));
  const CRYPTO_IDS = ASSETS.filter(a => a.class === 'Crypto').map(a => a.id).join(',');

  const FALLBACK = {
    bitcoin: { usd: 87500, usd_24h_change: 1.1 },
    ethereum: { usd: 3150, usd_24h_change: -0.4 },
    binancecoin: { usd: 620, usd_24h_change: 0.6 },
    solana: { usd: 145, usd_24h_change: 2.3 },
    ripple: { usd: 0.62, usd_24h_change: 0.2 },
    cardano: { usd: 0.48, usd_24h_change: -0.8 },
    dogecoin: { usd: 0.14, usd_24h_change: 3.1 },
    'avalanche-2': { usd: 32, usd_24h_change: 1.5 },
    polkadot: { usd: 7.1, usd_24h_change: -0.3 },
    chainlink: { usd: 16.2, usd_24h_change: 0.7 },
    aapl: { usd: 228, usd_24h_change: 0.4 },
    msft: { usd: 425, usd_24h_change: 0.2 },
    googl: { usd: 178, usd_24h_change: -0.1 },
    tsla: { usd: 265, usd_24h_change: 1.8 },
    amzn: { usd: 195, usd_24h_change: 0.5 },
    vtsax: { usd: 135, usd_24h_change: 0.3 },
    vfiax: { usd: 520, usd_24h_change: 0.25 },
    fxaix: { usd: 195, usd_24h_change: 0.3 }
  };

  const MAX_HISTORY = 200;
  const COOKIE = 'cmp_v20_session';
  const COOKIE_DAYS = 365;
  // Auth: email OR username + password (never displayed in UI/README)
  const AUTH_EMAIL = '222ghettoangel@gmail.com';
  const AUTH_USER = 'Joyee';
  const AUTH_PASS = 'pappyo';

  function emptyHoldings() {
    const h = {};
    SYMBOLS.forEach(s => { h[s] = { units: 0, cost: 0 }; });
    return h;
  }

  /**
   * Seeded Main Dashboard
   * Available Cash: $190 | Invested (cost basis): $300 | Realized Profit: $40
   * 2026-09-18: +$150 deposit, then Invested $150 in TSLA
   */
  function createMainPortfolio() {
    const holdings = emptyHoldings();
    // Prior ~$150 cost + TSLA $150 on 2026-09-18
    holdings.BTC  = { units: 0.001, cost: 80 };
    holdings.ETH  = { units: 0.015, cost: 45 };
    holdings.AAPL = { units: 0.1,   cost: 25 };
    holdings.TSLA = { units: 0.566, cost: 150 }; // ~$150 at fallback ~$265/share

    const sept = (d) => new Date(2026, 8, d).getTime(); // Sept 2026

    return {
      name: 'Main Dashboard',
      mainBalance: 190,       // Available Cash (after +150 deposit then -150 invest)
      holdings,               // Invested cost basis = $300
      realizedPnL: 40,        // Profit Earned (realized)
      transactions: [
        { id: 'tx1', type: 'Deposit', detail: 'Added $100', amount: 100, date: '2026-09-05' },
        { id: 'tx2', type: 'Invest',  detail: 'Invested $80 in BTC', amount: 80, date: '2026-09-05' },
        { id: 'tx3', type: 'Deposit', detail: 'Added $90', amount: 90, date: '2026-09-06' },
        { id: 'tx4', type: 'Invest',  detail: 'Invested $45 in ETH', amount: 45, date: '2026-09-07' },
        { id: 'tx5', type: 'Invest',  detail: 'Invested $25 in AAPL', amount: 25, date: '2026-09-08' },
        { id: 'tx6', type: 'Sell',    detail: 'Partial gain realized', amount: 40, date: '2026-09-09' },
        { id: 'tx7', type: 'Deposit', detail: 'Added $150', amount: 150, date: '2026-09-18' },
        { id: 'tx8', type: 'Invest',  detail: 'Invested $150 in TSLA', amount: 150, date: '2026-09-18' }
      ],
      // True total-value history; last point is refreshed live on load / each trade
      portfolioHistory: [
        { t: sept(5),  v: 100 },
        { t: sept(6),  v: 190 },
        { t: sept(7),  v: 220 },
        { t: sept(8),  v: 245 },
        { t: sept(9),  v: 280 },
        { t: sept(10), v: 310 },
        { t: sept(18), v: 490 },
        { t: Date.now(), v: 490 }
      ],
      alerts: [],
      goals: []
    };
  }

  function createEmptyPortfolio(name) {
    return {
      name: name || 'New Portfolio',
      mainBalance: 0,
      holdings: emptyHoldings(),
      realizedPnL: 0,
      transactions: [],
      portfolioHistory: [{ t: Date.now(), v: 0 }],
      alerts: [],
      goals: []
    };
  }

  let state = loadState();
  let prices = {};
  let charts = {};
  let sellTarget = null;
  let portfolioMode = 'new';
  let contributeId = null;
  let lastFocus = null;
  let holdingsFilter = 'all';
  let holdingsQuery = '';
  let historyQuery = '';
  let isGuest = false;

  function loadState() {
    try {
      const raw = localStorage.getItem('citymoney_pro_v20b');
      if (raw) {
        const p = JSON.parse(raw);
        Object.values(p.portfolios || {}).forEach(pf => {
          if (!pf.alerts) pf.alerts = [];
          if (!pf.goals) pf.goals = [];
          if (!pf.portfolioHistory) pf.portfolioHistory = [{ t: Date.now(), v: pf.mainBalance || 0 }];
          pf.portfolioHistory = pf.portfolioHistory.map(h => typeof h === 'number' ? { t: Date.now(), v: h } : h);
          if (!pf.holdings) pf.holdings = emptyHoldings();
          SYMBOLS.forEach(s => { if (!pf.holdings[s]) pf.holdings[s] = { units: 0, cost: 0 }; });
        });
        return p;
      }
    } catch (_) {}
    return {
      activePortfolioId: 'main',
      portfolios: { main: createMainPortfolio() }
    };
  }

  function save() {
    try { localStorage.setItem('citymoney_pro_v20b', JSON.stringify(state)); } catch (_) {}
  }
  function cur() { return state.portfolios[state.activePortfolioId]; }

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
  function roundU(n) { return Math.round((Number(n) || 0) * 1e8) / 1e8; }
  function usd(n) {
    return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function unitsFmt(n) {
    if (n >= 1) return n.toFixed(4);
    if (n >= 0.01) return n.toFixed(6);
    return n.toFixed(8);
  }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function toast(msg, type = 'success') {
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = msg;
    document.getElementById('toast-container').appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }

  /* Auth cookie */
  function setCookie(n, v, d) {
    const exp = new Date(Date.now() + d * 864e5).toUTCString();
    document.cookie = `${n}=${v};expires=${exp};path=/;SameSite=Lax`;
  }
  function getCookie(n) {
    const m = document.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function isLoggedIn() {
    const v = getCookie(COOKIE);
    return v === 'user' || v === 'guest';
  }
  function setSession(mode) {
    if (mode) setCookie(COOKIE, mode, COOKIE_DAYS);
    else setCookie(COOKIE, '', -1);
  }

  function initTheme() {
    const t = localStorage.getItem('citymoney_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
    document.getElementById('themeToggle').textContent = t === 'dark' ? '☀️' : '🌙';
  }
  function toggleTheme() {
    const curT = document.documentElement.getAttribute('data-theme');
    const next = curT === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('citymoney_theme', next);
    document.getElementById('themeToggle').textContent = next === 'dark' ? '☀️' : '🌙';
    destroyCharts(); initCharts(); updateCharts();
  }

  function openModal(id) {
    lastFocus = document.activeElement;
    document.getElementById(id).classList.add('open');
    const f = document.getElementById(id).querySelector('input, select, button');
    if (f) setTimeout(() => f.focus(), 40);
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const open = [...document.querySelectorAll('.modal-overlay.open')].filter(m => m.id !== 'loginOverlay' || !document.getElementById('app').classList.contains('visible'));
      // Always allow Esc on non-login modals; login only when already in app (shouldn't happen)
      const closable = [...document.querySelectorAll('.modal-overlay.open')].filter(m => m.id !== 'loginOverlay');
      if (closable.length) closeModal(closable[closable.length - 1].id);
    }
    if (e.key === '?' && !e.target.matches('input, textarea, select') && document.getElementById('app').classList.contains('visible')) {
      toast('Shortcuts: D Dashboard · I Invest · G Goals · A Alerts · H History · T Theme', 'alert');
    }
  });

  function getPrice(sym) {
    const id = ID_MAP[sym];
    return (prices[id] && prices[id].usd) || 0;
  }
  async function fetchPrices() {
    const loader = document.getElementById('priceLoading');
    if (loader) loader.classList.remove('hidden');
    try {
      if (!navigator.onLine) throw new Error('offline');
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_IDS}&vs_currencies=usd&include_24hr_change=true`);
      if (!res.ok) throw new Error('api');
      const data = await res.json();
      prices = { ...FALLBACK, ...data };
      ASSETS.filter(a => a.class !== 'Crypto').forEach(a => {
        const base = FALLBACK[a.id]?.usd || 100;
        const ch = (Math.random() - 0.5) * 0.7;
        prices[a.id] = { usd: +(base * (1 + ch / 100)).toFixed(2), usd_24h_change: +ch.toFixed(2) };
      });
    } catch (_) {
      prices = { ...FALLBACK };
    }
    if (loader) loader.classList.add('hidden');
    renderPrices(); renderHoldings(); renderBalances(); updateCharts(); checkAlerts();
    if (sellTarget) updateSellEstimate();
  }

  function costBasis() {
    return Object.values(cur().holdings).reduce((s, h) => s + (h.cost || 0), 0);
  }
  function marketValue() {
    return SYMBOLS.reduce((s, sym) => {
      const h = cur().holdings[sym];
      return s + (h ? h.units * getPrice(sym) : 0);
    }, 0);
  }
  function appendHistory() {
    const total = cur().mainBalance + marketValue();
    cur().portfolioHistory.push({ t: Date.now(), v: total });
    if (cur().portfolioHistory.length > 90) cur().portfolioHistory = cur().portfolioHistory.slice(-90);
  }

  function renderPortfolioSelect() {
    const sel = document.getElementById('portfolioSelect');
    sel.innerHTML = Object.entries(state.portfolios).map(([id, p]) =>
      `<option value="${esc(id)}" ${id === state.activePortfolioId ? 'selected' : ''}>${esc(p.name)}</option>`
    ).join('');
  }
  /** Sum deposits / invests from transaction history (true flow totals) */
  function flowTotals() {
    let deposited = 0;
    let invested = 0;
    (cur().transactions || []).forEach(tx => {
      const t = (tx.type || '').toLowerCase();
      const a = Math.abs(Number(tx.amount) || 0);
      if (t === 'deposit') deposited += a;
      if (t === 'invest') invested += a;
    });
    return { deposited, invested };
  }

  function renderBalances() {
    const p = cur();
    const cost = costBasis();
    const mkt = marketValue();
    const unreal = mkt - cost;
    const real = p.realizedPnL || 0;
    const totalPnL = unreal + real;
    const net = p.mainBalance + mkt;
    const flow = flowTotals();

    document.getElementById('mainBalance').textContent = usd(p.mainBalance);
    document.getElementById('investedBalance').textContent = usd(cost);
    document.getElementById('marketValue').textContent = usd(mkt);
    document.getElementById('netWorth').textContent = usd(net);

    const depEl = document.getElementById('totalDeposited');
    const invEl = document.getElementById('totalInvested');
    if (depEl) depEl.textContent = usd(flow.deposited);
    if (invEl) invEl.textContent = usd(flow.invested);

    const pnlEl = document.getElementById('totalPnL');
    pnlEl.textContent = usd(totalPnL);
    pnlEl.className = 'flow-value ' + (totalPnL >= 0 ? 'positive' : 'negative');
    const pnlFlow = document.getElementById('pnlFlow');
    if (pnlFlow) pnlFlow.classList.toggle('is-neg', totalPnL < 0);
    document.getElementById('pnlBreakdown').textContent = `Unrealized ${usd(unreal)} · Realized ${usd(real)}`;
  }
  function renderPrices() {
    const show = ['BTC','ETH','SOL','AAPL','MSFT','TSLA','VTSAX','VFIAX'];
    document.getElementById('priceGrid').innerHTML = show.map(sym => {
      const p = prices[ID_MAP[sym]] || {};
      const ch = p.usd_24h_change || 0;
      return `<div class="price-item">
        <h4>${esc(sym)}</h4>
        <div class="price">${p.usd ? usd(p.usd) : '—'}</div>
        <div class="change ${ch >= 0 ? 'positive' : 'negative'}">${ch >= 0 ? '+' : ''}${Number(ch).toFixed(2)}%</div>
      </div>`;
    }).join('');
  }
  function renderHoldings() {
    const body = document.getElementById('holdingsBody');
    const q = holdingsQuery.toLowerCase();
    const rows = SYMBOLS.map(sym => {
      const h = cur().holdings[sym] || { units: 0, cost: 0 };
      if (h.units <= 1e-10) return null;
      const cls = CLASS_MAP[sym] || '';
      if (holdingsFilter !== 'all' && cls !== holdingsFilter) return null;
      if (q && !((NAME_MAP[sym] || '') + ' ' + sym).toLowerCase().includes(q)) return null;
      const mkt = h.units * getPrice(sym);
      const pnl = mkt - h.cost;
      return `<tr>
        <td><strong>${esc(sym)}</strong><br><span style="font-size:0.72rem;color:var(--text-muted)">${esc(NAME_MAP[sym]||'')}</span></td>
        <td>${esc(cls)}</td>
        <td>${unitsFmt(h.units)}</td>
        <td>${usd(h.cost)}</td>
        <td>${usd(mkt)}</td>
        <td class="${pnl >= 0 ? 'positive' : 'negative'}">${usd(pnl)}</td>
        <td><button class="sell-btn" type="button" data-symbol="${esc(sym)}">Sell</button></td>
      </tr>`;
    }).filter(Boolean);
    if (!rows.length) {
      body.innerHTML = `<tr><td colspan="7"><div class="empty-state"><div class="icon">📭</div><p>No matching holdings.</p></div></td></tr>`;
      return;
    }
    body.innerHTML = rows.join('');
    body.querySelectorAll('.sell-btn').forEach(btn => btn.addEventListener('click', () => openSellModal(btn.dataset.symbol)));
  }
  function renderTransactions() {
    const list = document.getElementById('txList');
    let txs = cur().transactions || [];
    if (historyQuery) {
      const q = historyQuery.toLowerCase();
      txs = txs.filter(t => (t.detail || '').toLowerCase().includes(q) || (t.type || '').toLowerCase().includes(q));
    }
    if (!txs.length) {
      list.innerHTML = `<div class="empty-state"><div class="icon">📋</div><p>No transactions found.</p></div>`;
      return;
    }
    list.innerHTML = txs.map(tx => {
      const dir = tx.amount >= 0 ? 'In' : 'Out';
      return `<div class="tx-item">
        <div class="detail">${esc(tx.detail)}</div>
        <span class="direction">${dir}</span>
        <div class="amount ${tx.amount >= 0 ? 'positive' : 'negative'}">${usd(Math.abs(tx.amount))}</div>
        <div class="date">${esc(tx.date)}</div>
      </div>`;
    }).join('');
  }
  function renderAlerts() {
    const list = document.getElementById('alertsList');
    const alerts = cur().alerts || [];
    if (!alerts.length) {
      list.innerHTML = `<div class="empty-state"><div class="icon">🔔</div><p>No active alerts.</p></div>`;
      return;
    }
    list.innerHTML = alerts.map(a => `
      <div class="alert-item">
        <div><strong>${esc(a.symbol)}</strong> ${a.direction === 'above' ? '≥' : '≤'} ${usd(a.price)}</div>
        <button class="remove" type="button" data-id="${esc(a.id)}" aria-label="Remove">×</button>
      </div>`).join('');
    list.querySelectorAll('.remove').forEach(btn => {
      btn.addEventListener('click', () => {
        cur().alerts = cur().alerts.filter(x => x.id !== btn.dataset.id);
        save(); renderAlerts(); toast('Alert removed');
      });
    });
  }
  function renderGoals() {
    const grid = document.getElementById('goalsGrid');
    const goals = cur().goals || [];
    if (!goals.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="icon">🎯</div><p>No goals yet. Create Home, Education, Retirement or Custom goals.</p></div>`;
      return;
    }
    grid.innerHTML = goals.map(g => {
      const pct = Math.min(100, (g.current / g.target) * 100);
      const left = Math.max(0, g.target - g.current);
      return `<div class="card goal-card">
        <div class="goal-header"><div>
          <div class="goal-title">${esc(g.name)}</div>
          <div class="goal-meta">${esc(g.type)} · Target ${usd(g.target)}</div>
        </div></div>
        <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
        <div class="goal-stats"><span>${usd(g.current)} saved</span><span>${pct.toFixed(1)}% · ${usd(left)} left</span></div>
        <div class="goal-actions">
          <button class="btn btn-sm btn-primary contribute-btn" type="button" data-id="${esc(g.id)}">+ Contribute</button>
          <button class="btn btn-sm btn-ghost delete-goal-btn" type="button" data-id="${esc(g.id)}">Delete</button>
        </div>
      </div>`;
    }).join('');
    grid.querySelectorAll('.contribute-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        contributeId = btn.dataset.id;
        document.getElementById('contributeAmount').value = '';
        openModal('contributeModal');
      });
    });
    grid.querySelectorAll('.delete-goal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        cur().goals = cur().goals.filter(g => g.id !== btn.dataset.id);
        save(); renderGoals(); toast('Goal deleted');
      });
    });
  }
  function populateSelects() {
    const opts = ASSETS.map(a =>
      `<option value="${esc(a.symbol)}">${esc(a.name)} (${esc(a.symbol)}) — ${esc(a.class)}</option>`
    ).join('');
    document.getElementById('assetSelect').innerHTML = opts;
    document.getElementById('alertSymbol').innerHTML = opts;
  }
  function renderAll() {
    renderPortfolioSelect(); renderBalances(); renderPrices();
    renderHoldings(); renderTransactions(); renderAlerts(); renderGoals(); updateCharts();
  }

  function destroyCharts() {
    Object.values(charts).forEach(c => { if (c) c.destroy(); });
    charts = {};
  }
  function initCharts() {
    if (typeof Chart === 'undefined') return;
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const tick = dark ? '#8b95a5' : '#5c6570';
    const grid = dark ? '#2a3340' : '#e5e7eb';
    const common = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: tick } } } };
    const hist = cur().portfolioHistory || [];
    charts.portfolio = new Chart(document.getElementById('portfolioChart'), {
      type: 'line',
      data: {
        labels: hist.map((_, i) => i === hist.length - 1 ? 'Now' : ''),
        datasets: [{
          label: 'Value', data: hist.map(h => h.v),
          borderColor: '#f0b90b', backgroundColor: 'rgba(240,185,11,0.1)',
          fill: true, tension: 0.35, pointRadius: 0
        }]
      },
      options: { ...common, scales: { x: { ticks: { color: tick }, grid: { color: grid } }, y: { ticks: { color: tick }, grid: { color: grid } } } }
    });
    charts.allocation = new Chart(document.getElementById('allocationChart'), {
      type: 'doughnut',
      data: {
        labels: SYMBOLS,
        datasets: [{ data: SYMBOLS.map(() => 0), backgroundColor: [
          '#f0b90b','#627eea','#f3ba2f','#14f195','#23292f','#0033ad','#c2a633','#e84142','#e6007a','#2a5ada',
          '#a2aaad','#00a4ef','#4285f4','#cc0000','#ff9900','#c8102e','#1e3a5f','#00a651'
        ]}]
      },
      options: { ...common, cutout: '64%' }
    });
  }
  function updateCharts() {
    if (!charts.portfolio) return;
    const total = cur().mainBalance + marketValue();
    const hist = [...(cur().portfolioHistory || [])];
    if (hist.length) hist[hist.length - 1] = { t: Date.now(), v: total };
    charts.portfolio.data.labels = hist.map((_, i) => i === hist.length - 1 ? 'Now' : '');
    charts.portfolio.data.datasets[0].data = hist.map(h => h.v);
    charts.portfolio.update('none');
    if (charts.allocation) {
      charts.allocation.data.datasets[0].data = SYMBOLS.map(s => (cur().holdings[s]?.units || 0) * getPrice(s));
      charts.allocation.update('none');
    }
  }

  function addTx(type, detail, amount) {
    cur().transactions.unshift({
      id: uid(), type, detail, amount,
      date: new Date().toISOString().slice(0, 10)
    });
    if (cur().transactions.length > MAX_HISTORY) cur().transactions = cur().transactions.slice(0, MAX_HISTORY);
    save(); renderTransactions();
  }

  function addMoney() {
    const val = parseFloat(document.getElementById('addMoneyAmount').value);
    if (!val || val <= 0) { toast('Enter a valid amount', 'error'); return; }
    cur().mainBalance += val;
    addTx('Deposit', `Added ${usd(val)}`, val);
    appendHistory(); save();
    closeModal('addMoneyModal'); renderAll();
    toast(`Added ${usd(val)}`);
  }
  function invest() {
    const symbol = document.getElementById('assetSelect').value;
    const val = parseFloat(document.getElementById('investAmount').value);
    if (!val || val <= 0) { toast('Enter a valid amount', 'error'); return; }
    if (val > cur().mainBalance) { toast('Insufficient cash', 'error'); return; }
    const price = getPrice(symbol);
    if (!price) { toast('Price unavailable', 'error'); return; }
    const u = roundU(val / price);
    const h = cur().holdings[symbol];
    h.units = roundU(h.units + u);
    h.cost += val;
    cur().mainBalance -= val;
    addTx('Invest', `Invested ${usd(val)} in ${symbol} (${unitsFmt(u)} units)`, val);
    appendHistory(); save();
    document.getElementById('investAmount').value = '';
    renderAll(); toast(`Bought ${unitsFmt(u)} ${symbol}`);
    showSection('dashboard');
  }
  function openSellModal(symbol) {
    const h = cur().holdings[symbol];
    if (!h || h.units <= 0) return;
    sellTarget = symbol;
    document.getElementById('sellTitle').textContent = `Sell ${symbol}`;
    document.getElementById('sellPercent').value = '100';
    updateSellEstimate();
    openModal('sellModal');
  }
  function updateSellEstimate() {
    if (!sellTarget) return;
    const pct = parseFloat(document.getElementById('sellPercent').value) / 100;
    document.getElementById('sellEstimate').textContent =
      usd(cur().holdings[sellTarget].units * pct * getPrice(sellTarget));
  }
  function confirmSell() {
    if (!sellTarget) return;
    const pct = parseFloat(document.getElementById('sellPercent').value) / 100;
    const h = cur().holdings[sellTarget];
    const uSell = roundU(h.units * pct);
    const costSold = h.cost * pct;
    const proceeds = uSell * getPrice(sellTarget);
    const pnl = proceeds - costSold;
    h.units = roundU(h.units - uSell);
    h.cost -= costSold;
    if (h.units < 1e-10) { h.units = 0; h.cost = 0; }
    cur().mainBalance += proceeds;
    cur().realizedPnL = (cur().realizedPnL || 0) + pnl;
    const sign = pnl >= 0 ? '+' : '';
    addTx('Sell', `Sold ${unitsFmt(uSell)} ${sellTarget} for ${usd(proceeds)} (P&L ${sign}${usd(pnl)})`, proceeds);
    appendHistory(); save();
    closeModal('sellModal'); sellTarget = null;
    renderAll(); toast(`Sold for ${usd(proceeds)}`);
  }

  function switchPortfolio() {
    state.activePortfolioId = document.getElementById('portfolioSelect').value;
    save(); renderAll(); toast(`Switched to ${cur().name}`);
  }
  function openNewPortfolio() {
    portfolioMode = 'new';
    document.getElementById('portfolioModalTitle').textContent = 'New Portfolio';
    document.getElementById('portfolioNameInput').value = '';
    openModal('portfolioModal');
  }
  function openRenamePortfolio() {
    portfolioMode = 'rename';
    document.getElementById('portfolioModalTitle').textContent = 'Rename Portfolio';
    document.getElementById('portfolioNameInput').value = cur().name;
    openModal('portfolioModal');
  }
  function confirmPortfolio() {
    const name = document.getElementById('portfolioNameInput').value.trim();
    if (!name) { toast('Enter a name', 'error'); return; }
    if (portfolioMode === 'new') {
      const id = 'p_' + uid();
      state.portfolios[id] = createEmptyPortfolio(name);
      state.activePortfolioId = id;
      toast(`Created "${name}"`);
    } else {
      cur().name = name;
      toast('Renamed');
    }
    save(); closeModal('portfolioModal'); renderAll();
  }

  function confirmGoal() {
    const name = document.getElementById('goalName').value.trim();
    const type = document.getElementById('goalType').value;
    const target = parseFloat(document.getElementById('goalTarget').value);
    const currentAmt = parseFloat(document.getElementById('goalCurrent').value) || 0;
    if (!name) { toast('Enter a name', 'error'); return; }
    if (!target || target < 100) { toast('Target min $100', 'error'); return; }
    if (!cur().goals) cur().goals = [];
    cur().goals.push({ id: uid(), name, type, target, current: currentAmt });
    save(); closeModal('goalModal'); renderGoals(); toast(`Goal "${name}" created`);
  }
  function confirmContribute() {
    const amount = parseFloat(document.getElementById('contributeAmount').value);
    if (!amount || amount <= 0) { toast('Enter amount', 'error'); return; }
    if (amount > cur().mainBalance) { toast('Insufficient cash', 'error'); return; }
    const goal = cur().goals.find(g => g.id === contributeId);
    if (!goal) return;
    goal.current += amount;
    cur().mainBalance -= amount;
    addTx('Goal', `Contributed ${usd(amount)} to "${goal.name}"`, -amount);
    appendHistory(); save();
    closeModal('contributeModal'); renderAll(); toast(`Contributed ${usd(amount)}`);
  }
  function addAlert() {
    const symbol = document.getElementById('alertSymbol').value;
    const price = parseFloat(document.getElementById('alertPrice').value);
    const direction = document.getElementById('alertDirection').value;
    if (!price || price <= 0) { toast('Enter target price', 'error'); return; }
    if (!cur().alerts) cur().alerts = [];
    cur().alerts.push({ id: uid(), symbol, price, direction });
    save(); document.getElementById('alertPrice').value = '';
    renderAlerts(); toast(`Alert set for ${symbol}`);
  }
  function checkAlerts() {
    const alerts = cur().alerts || [];
    const remain = [];
    alerts.forEach(a => {
      const c = getPrice(a.symbol);
      if (!c) { remain.push(a); return; }
      const hit = a.direction === 'above' ? c >= a.price : c <= a.price;
      if (hit) toast(`ALERT: ${a.symbol} is ${usd(c)}`, 'alert');
      else remain.push(a);
    });
    if (remain.length !== alerts.length) { cur().alerts = remain; save(); renderAlerts(); }
  }
  function exportCSV() {
    const txs = cur().transactions;
    if (!txs.length) { toast('No data', 'error'); return; }
    const header = 'Date,Type,Detail,Amount,Direction\n';
    const rows = txs.map(t => {
      const dir = t.amount >= 0 ? 'In' : 'Out';
      return `"${t.date}","${t.type}","${(t.detail||'').replace(/"/g,'""')}",${t.amount},"${dir}"`;
    }).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([header + rows], { type: 'text/csv' }));
    a.download = `citymoney-${cur().name.replace(/\s+/g,'-')}-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast('CSV exported');
  }
  function clearHistory() {
    cur().transactions = [];
    save(); closeModal('clearHistoryModal'); renderTransactions(); toast('History cleared');
  }

  function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const t = document.getElementById(id);
    if (t) t.classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.dataset.section === id));
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
  }

  function startApp(mode) {
    isGuest = mode === 'guest';
    setSession(mode);
    document.getElementById('loginOverlay').classList.remove('open');
    document.getElementById('app').classList.add('visible');
    document.getElementById('app').setAttribute('aria-hidden', 'false');
    document.getElementById('topNav').classList.add('visible');
    document.getElementById('mainFooter').classList.remove('logged-out');
    document.body.classList.add('logged-in');

    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    document.getElementById('welcomeMsg').textContent = isGuest
      ? `${greet} — browsing as guest.`
      : `${greet} — welcome back.`;

    populateSelects();
    initCharts();
    renderAll();
    fetchPrices();
    if (!window._priceTimer) window._priceTimer = setInterval(fetchPrices, 60000);
  }

  function logout() {
    setSession(null);
    document.getElementById('app').classList.remove('visible');
    document.getElementById('app').setAttribute('aria-hidden', 'true');
    document.getElementById('topNav').classList.remove('visible');
    document.getElementById('mainFooter').classList.add('logged-out');
    document.body.classList.remove('logged-in');
    destroyCharts();
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      if (m.id !== 'loginOverlay') m.classList.remove('open');
    });
    document.getElementById('loginOverlay').classList.add('open');
    document.getElementById('loginId').value = '';
    document.getElementById('password').value = '';
    document.getElementById('loginError').textContent = '';
    document.getElementById('loginId').focus();
  }

  function updateOnline() {
    const b = document.getElementById('offlineBanner');
    navigator.onLine ? b.classList.remove('visible') : b.classList.add('visible');
  }
  window.addEventListener('online', updateOnline);
  window.addEventListener('offline', updateOnline);

  function bind() {
    document.getElementById('loginBtn').addEventListener('click', () => {
      const id = document.getElementById('loginId').value.trim();
      const pass = document.getElementById('password').value;
      const err = document.getElementById('loginError');
      const idOk = id.toLowerCase() === AUTH_EMAIL.toLowerCase() || id === AUTH_USER;
      if (idOk && pass === AUTH_PASS) {
        err.textContent = '';
        startApp('user');
      } else {
        err.textContent = 'Invalid email/username or password';
      }
    });
    document.getElementById('guestBtn').addEventListener('click', () => startApp('guest'));
    document.getElementById('password').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('loginBtn').click();
    });
    document.getElementById('loginId').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('password').focus();
    });
    document.getElementById('togglePassword').addEventListener('click', () => {
      const i = document.getElementById('password');
      const b = document.getElementById('togglePassword');
      if (i.type === 'password') { i.type = 'text'; b.textContent = 'Hide'; b.setAttribute('aria-label', 'Hide password'); }
      else { i.type = 'password'; b.textContent = 'Show'; b.setAttribute('aria-label', 'Show password'); }
    });

    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('hamburger').addEventListener('click', () => {
      const open = document.getElementById('navLinks').classList.toggle('open');
      document.getElementById('hamburger').setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('[data-section]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        if (el.dataset.section && document.getElementById('app').classList.contains('visible')) {
          showSection(el.dataset.section);
        }
      });
    });

    document.getElementById('addMoneyBtn').addEventListener('click', () => {
      document.getElementById('addMoneyAmount').value = '';
      openModal('addMoneyModal');
    });
    document.getElementById('confirmAddMoney').addEventListener('click', addMoney);
    document.getElementById('cancelAddMoney').addEventListener('click', () => closeModal('addMoneyModal'));
    document.getElementById('withdrawBtn').addEventListener('click', () => openModal('withdrawModal'));
    document.getElementById('closeWithdrawModal').addEventListener('click', () => closeModal('withdrawModal'));
    document.getElementById('exportCsvBtn').addEventListener('click', exportCSV);
    document.getElementById('gotoGoalsBtn').addEventListener('click', () => showSection('goals'));
    document.getElementById('investBtn').addEventListener('click', invest);
    document.getElementById('sellPercent').addEventListener('change', updateSellEstimate);
    document.getElementById('confirmSellBtn').addEventListener('click', confirmSell);
    document.getElementById('cancelSellBtn').addEventListener('click', () => { closeModal('sellModal'); sellTarget = null; });
    document.getElementById('newPortfolioBtn').addEventListener('click', openNewPortfolio);
    document.getElementById('renamePortfolioBtn').addEventListener('click', openRenamePortfolio);
    document.getElementById('portfolioSelect').addEventListener('change', switchPortfolio);
    document.getElementById('confirmPortfolio').addEventListener('click', confirmPortfolio);
    document.getElementById('cancelPortfolio').addEventListener('click', () => closeModal('portfolioModal'));
    document.getElementById('newGoalBtn').addEventListener('click', () => {
      document.getElementById('goalName').value = '';
      document.getElementById('goalTarget').value = '';
      document.getElementById('goalCurrent').value = '0';
      openModal('goalModal');
    });
    document.getElementById('confirmGoal').addEventListener('click', confirmGoal);
    document.getElementById('cancelGoal').addEventListener('click', () => closeModal('goalModal'));
    document.getElementById('confirmContribute').addEventListener('click', confirmContribute);
    document.getElementById('cancelContribute').addEventListener('click', () => closeModal('contributeModal'));
    document.getElementById('addAlertBtn').addEventListener('click', addAlert);
    document.getElementById('clearHistoryBtn').addEventListener('click', () => openModal('clearHistoryModal'));
    document.getElementById('confirmClearHistory').addEventListener('click', clearHistory);
    document.getElementById('cancelClearHistory').addEventListener('click', () => closeModal('clearHistoryModal'));

    document.getElementById('holdingsSearch').addEventListener('input', e => { holdingsQuery = e.target.value; renderHoldings(); });
    document.getElementById('classFilters').addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      document.querySelectorAll('#classFilters .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      holdingsFilter = chip.dataset.class;
      renderHoldings();
    });
    document.getElementById('historySearch').addEventListener('input', e => { historyQuery = e.target.value; renderTransactions(); });

    document.addEventListener('keydown', e => {
      if (e.target.matches('input, textarea, select')) return;
      if (!document.getElementById('app').classList.contains('visible')) return;
      const map = { d: 'dashboard', i: 'invest', g: 'goals', a: 'alerts', h: 'history' };
      if (map[e.key.toLowerCase()]) showSection(map[e.key.toLowerCase()]);
      if (e.key.toLowerCase() === 't') toggleTheme();
    });
  }

  function init() {
    initTheme();
    updateOnline();
    bind();
    if (isLoggedIn()) {
      startApp(getCookie(COOKIE) === 'guest' ? 'guest' : 'user');
    } else {
      document.getElementById('loginId').focus();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
