# 📈 Trading Decision Support App

Personal trading decision support application built for **discipline, risk control, and clarity** —  
**not** for signals, predictions, or automation.

---

## 🎯 Goal
- Reduce emotional trading
- Enforce TP / CL discipline
- Improve risk–reward awareness
- Build consistent trading habits through structure

---

## 👤 Target User
- Single user (personal dogfooding)
- Beginner–intermediate trader
- Manual trading only
- Testing period: **minimum 6 months**

---

## 🧱 Product Principles
- Guardrails > predictions
- User decides, system calculates
- No feature without real usage
- Cut features aggressively if unused

---

# 🗓️ 6-Month Feature Timeline

---

## 🟢 Phase 1 — Core Discipline (Month 0–2)

### 🎨 Frontend (FE)
- Trade entry form
  - Entry price
  - Capital used
  - Risk % per trade
- Take Profit & Cut Loss calculator UI
- Risk–Reward (R:R) visualization
- Profit & loss simulator
- AVG impact simulator (before trade execution)
- Mandatory trade notes (reason, setup)
- Simple trade journal (list & detail view)
- Basic dashboard (open vs closed trades)

### ⚙️ Backend (BE)
- Trade CRUD API
- Risk calculation service
- TP / CL computation logic
- PostgreSQL schema:
  - trades
  - trade_notes
- Validation rules:
  - Trade must include TP & CL
- Single-user authentication
- Daily snapshot for open positions

### ✅ Exit Criteria
- All trades must be recorded through the app
- No trade without TP / CL
- App used daily during trading days

---

## 🟡 Phase 2 — Decision Context (Month 3–4)

### 🎨 Frontend (FE)
- Valuation **range** display:
  - Conservative
  - Base
  - Optimistic
- Assumption selector:
  - PE-based
  - PBV-based
  - Growth-based
- Conglomerate mapping (read-only)
- Affiliated stock list per conglomerate
- Performance comparison per stock
- Weight visualization (market cap / revenue)

### ⚙️ Backend (BE)
- Valuation range engine (no single fair price)
- Assumption configuration storage
- Conglomerate–company relationship schema
- Aggregation & weighting logic
- Cached valuation results
- Read-only valuation endpoints

### ⚠️ Guardrails
- No “buy”, “sell”, or “target price”
- Valuation always shown as a **range**
- Conglomerate average labeled as **context only**

---

## 🔵 Phase 3 — Review & Pruning (Month 5–6)

### 🎨 Frontend (FE)
- Trade performance dashboard
- Drawdown & recovery visualization
- Feature usage indicators
- Blocked / cancelled trade history
- Reflection & review notes UI
- Data export (CSV / JSON)

### ⚙️ Backend (BE)
- Trade analytics service
- Drawdown calculation logic
- Feature usage tracking
- Performance comparison:
  - Before app
  - After app
- Export endpoints

### 🧹 Feature Decision Rules
- **KEEP** → used ≥ 3× per week
- **MODIFY** → used but often skipped
- **REMOVE** → rarely or never used

---

# 📊 Personal Success Metrics
- % of trades with TP & CL
- Average risk per trade
- Average Risk–Reward ratio
- Max drawdown trend
- Number of cancelled trades after simulation
- Emotional override frequency

---

# 🚫 Explicit Non-Goals
- No auto trading
- No buy/sell signals
- No AI price prediction
- No real-time execution
- No social features or leaderboards

---

# 🛠️ Tech Stack

### Frontend
- React / Next.js
- TypeScript
- Redux Toolkit or Zustand
- TradingView Chart (embed)

### Backend
- Node.js
- Express
- PostgreSQL
- Cron jobs (daily snapshots)

---

## 📌 Final Note
> This app succeeds when it prevents bad trades,  
> not when it encourages more trades.

Any feature that increases emotional trading will be removed.
