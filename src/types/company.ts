export interface Sector {
  id: number;
  name: string;
}

export interface Subsector {
  id: number;
  name: string;
}

export interface Industry {
  id: number;
  name: string;
}

export interface SubIndustry {
  id: number;
  name: string;
}

export interface Managements {
  id: number;
  company_id: number;
  name: string;
  type: string;
  position: string;
  phone: string;
  email: string;
  is_affiliated: boolean;
}

export interface Subsidiaries {
  id: number;
  company_id: number;
  name: string;
  type: string;
  asset: string;
  percentage: string;
}

export interface Shareholders {
  id: number;
  company_id: number;
  name: string;
  type: string;
  total: string;
  percentage: string;
}

export interface StockList {
  id: number;
  ticker: string;
  name: string;
  logo: string;
  office_address: string;
  email: string;
  phone: string;
  fax: string;
  tin: string;
  website: string;
  listing_date: string;
  listing_board: string;
  main_business: string;
  sector: Sector;
  subsector: Subsector;
}

export interface Stock {
  id: number;
  ticker: string;
  name: string;
  logo: string;
  office_address: string;
  email: string;
  phone: string;
  fax: string;
  tin: string;
  website: string;
  listing_date: string;
  listing_board: string;
  main_business: string;
  sector: Sector;
  subsector: Subsector;
  industry: Industry;
  subindustry: SubIndustry;
  managements: Managements[];
  shareholders: Shareholders[];
  subsidiaries: Subsidiaries[];
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export interface StocksResponse {
  status: boolean;
  message: string;
  data: StockList[];
  options: PaginationOptions;
}

export interface StockDetailResponse {
  status: boolean;
  message: string;
  data: Stock;
  options: PaginationOptions;
}
