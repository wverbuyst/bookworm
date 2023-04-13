import { ApiResponse } from "./Api";
import { Column } from "./Table";

export interface UI {
  table: {
    limit: number;
    page: number;
    queryString: string;
    showAll: boolean;
  };
}

export interface BaseState<T> {
  getAllApi: ApiResponse<Array<T>> | null;
  overview: { [key: string]: Array<T> } | null;
}

export interface UITable<T, U> {
  columns: Column<T>;
  filter: U;
  limit: number;
  page: number;
  queryString: string;
  showAll: boolean;
}
