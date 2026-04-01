import { StockList } from "./company";

export interface Sector {
  id: number;
  name: string;
  total_companies: string;
}

export interface MarketIndex {
  id: number;
  ticker: string;
}

export interface MarketIndexDetail {
  id: number;
  company: StockList;
  indexes: MarketIndex;
}

export interface Brokers {
  id: number;
  ticker: string;
  name: string;
  type: string[];
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export interface SectorResponse {
  status: boolean;
  message: string;
  data: Sector[];
  options: PaginationOptions;
}

export interface MarketIndexResponse {
  status: boolean;
  message: string;
  data: MarketIndex[];
  options: PaginationOptions;
}

export interface MarketIndexDetailResponse {
  status: boolean;
  message: string;
  data: MarketIndexDetail[];
  options: PaginationOptions;
}

export interface BrokersResponse {
  status: boolean;
  message: string;
  data: Brokers[];
}
