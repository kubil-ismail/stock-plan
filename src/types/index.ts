export interface User {
  id: string;
  name: string;
  email: string;
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

export interface Profile {
  id: number;
  fullname: string;
  email: string;
  // tambah field lain kalau ada
}

export interface Response<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface TradingSetup {
  id: number;
  setup_slug: string;
  name: string;
  description: string;
  timeframe: "DAILY" | "WEEKLY" | "MONTHLY" | 'YEARLY'; // bisa ditambah kalau ada
}

export interface PaginationOptions {
  page: number | null;
  limit: number | null;
  total: number;
}

export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  data: T;
  options?: PaginationOptions;
}
