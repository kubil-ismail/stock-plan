export interface User {
  id: string;
  name: string;
  email: string;
}

export interface TradingSetup {
  id: string;
  name: string;
  description: string;
  timeframe: "Daily" | "Weekly" | "4H" | "1H";
  script: string; // HTML content from WYSIWYG editor
  createdAt: string;
}

export interface TradePlan {
  id: string;
  ticker: string;
  setupId: string;
  setupName: string;
  entryPrice: number;
  entryDate: string;
  entryReason: string;
  riskNote: string;
  confidenceScore: number; // 1-10
  emotionState: string;
  script: string; // HTML content from WYSIWYG editor (pre-filled from setup)
  status: "Planned" | "Active" | "Closed" | "Archive";
  createdAt: string;
  closedAt?: string;
}

export interface DashboardStats {
  totalPlans: number;
  totalSetups: number;
  totalInvested: number;
  winRatio: number;
}
