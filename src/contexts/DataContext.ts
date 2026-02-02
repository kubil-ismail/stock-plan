import React, { createContext, useContext, useState, useEffect } from "react";
import type { TradingSetup, TradePlan, DashboardStats } from "@/types";

interface DataContextType {
  setups: TradingSetup[];
  plans: TradePlan[];
  addSetup: (setup: Omit<TradingSetup, "id" | "createdAt">) => void;
  updateSetup: (id: string, setup: Partial<TradingSetup>) => void;
  deleteSetup: (id: string) => void;
  addPlan: (plan: Omit<TradePlan, "id" | "createdAt">) => void;
  updatePlan: (id: string, plan: Partial<TradePlan>) => void;
  deletePlan: (id: string) => void;
  getDashboardStats: () => DashboardStats;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock initial data
const mockSetups: TradingSetup[] = [
  {
    id: "1",
    name: "Breakout Strategy",
    description: "High probability breakout above key resistance levels",
    timeframe: "Daily",
    script:
      "<h2>Entry Rules</h2><ul><li>Price breaks above resistance with volume &gt; 2x average</li><li>Wait for confirmation candle close</li><li>Enter on pullback or next candle open</li></ul><h2>Exit Rules</h2><ul><li>Target: Previous swing high + 10%</li><li>Stop: Below breakout candle low</li></ul><h2>Risk Management</h2><ul><li>Maximum 2% risk per trade</li><li>Position size based on distance to stop loss</li></ul>",
    createdAt: new Date("2026-01-15").toISOString(),
  },
  {
    id: "2",
    name: "Pullback Entry",
    description: "Buy pullbacks in strong uptrends",
    timeframe: "Weekly",
    script:
      "<h2>Entry Checklist</h2><ul><li>Confirm uptrend (price above 50 EMA)</li><li>Wait for pullback to 50 EMA</li><li>Look for reversal candlestick pattern</li><li>Enter on confirmation</li></ul><h2>Exit Strategy</h2><ul><li>Target: Previous high + buffer</li><li>Stop: Below 50 EMA</li></ul>",
    createdAt: new Date("2026-01-10").toISOString(),
  },
];

const mockPlans: TradePlan[] = [
  {
    id: "1",
    ticker: "AAPL",
    setupId: "1",
    setupName: "Breakout Strategy",
    entryPrice: 185.5,
    entryDate: new Date("2026-01-28").toISOString(),
    entryReason:
      "Breaking above $185 resistance with strong volume (3x average). Tech sector showing strength. Earnings beat expectations.",
    riskNote:
      "Stop loss at $182. Risk $350 (2% of account). Favorable R:R of 1:2.",
    confidenceScore: 8,
    emotionState: "Calm and focused",
    script:
      "<h2>Entry Rules</h2><ul><li>✓ Price breaks above resistance with volume &gt; 2x average</li><li>✓ Wait for confirmation candle close</li><li>✓ Enter on pullback or next candle open</li></ul><h2>Exit Rules</h2><ul><li>Target: $192.50 (Previous swing high + 10%)</li><li>Stop: $182.00 (Below breakout candle low)</li></ul>",
    status: "Active",
    createdAt: new Date("2026-01-28").toISOString(),
  },
  {
    id: "2",
    ticker: "MSFT",
    setupId: "2",
    setupName: "Pullback Entry",
    entryPrice: 420.0,
    entryDate: new Date("2026-02-03").toISOString(),
    entryReason:
      "Pullback to 50 EMA in strong uptrend. Bullish engulfing pattern forming. Cloud sector momentum.",
    riskNote: "Waiting for confirmation. Will risk 1.5% of capital.",
    confidenceScore: 7,
    emotionState: "Patient",
    script:
      "<h2>Entry Checklist</h2><ul><li>✓ Confirm uptrend (price above 50 EMA)</li><li>✓ Wait for pullback to 50 EMA</li><li>⏳ Look for reversal candlestick pattern</li><li>⏳ Enter on confirmation</li></ul>",
    status: "Planned",
    createdAt: new Date("2026-02-01").toISOString(),
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [setups, setSetups] = useState<TradingSetup[]>([]);
  const [plans, setPlans] = useState<TradePlan[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedSetups = localStorage.getItem("stockplan_setups");
    const storedPlans = localStorage.getItem("stockplan_plans");

    if (storedSetups) {
      setSetups(JSON.parse(storedSetups));
    } else {
      setSetups(mockSetups);
      localStorage.setItem("stockplan_setups", JSON.stringify(mockSetups));
    }

    if (storedPlans) {
      setPlans(JSON.parse(storedPlans));
    } else {
      setPlans(mockPlans);
      localStorage.setItem("stockplan_plans", JSON.stringify(mockPlans));
    }
  }, []);

  // Save setups to localStorage whenever they change
  useEffect(() => {
    if (setups.length > 0) {
      localStorage.setItem("stockplan_setups", JSON.stringify(setups));
    }
  }, [setups]);

  // Save plans to localStorage whenever they change
  useEffect(() => {
    if (plans.length > 0) {
      localStorage.setItem("stockplan_plans", JSON.stringify(plans));
    }
  }, [plans]);

  return children;
}

export function useData() {
  const context = useContext(DataContext);
  return context;
}
