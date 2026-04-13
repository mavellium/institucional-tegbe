import type { IBlogPost } from "./IBlogPost";

export interface IBlogPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface IBlogPaginatedResponse {
  data: IBlogPost[];
  meta: IBlogPaginationMeta;
}
