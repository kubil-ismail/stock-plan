export interface Sector {
  id: number;
  name: string;
}

export interface Subsector {
  id: number;
  name: string;
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
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export interface StocksResponse {
  status: boolean;
  message: string;
  data: Stock[];
  options: PaginationOptions;
}
