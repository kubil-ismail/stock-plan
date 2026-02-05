export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Psychology {
  emotion_state: string;
  confidence_score: number;
}

export interface TradingPlan {
  id: string;
  ticker: string;
  setup: string;
  entry_price: number;
  entry_reason: string;
  risk_note: string;
  entry_date: string;
  psychology: Psychology;
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
  timeframe: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"; // bisa ditambah kalau ada
  script: string;
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
