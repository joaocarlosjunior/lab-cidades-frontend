import { Page } from "./Page";

export interface ApiResponse<T> {
    content: T[];
    page: Page
  }