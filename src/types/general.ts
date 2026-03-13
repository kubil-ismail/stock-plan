export interface Sector {
  id: number;
  name: string;
  total_companies: string;
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
