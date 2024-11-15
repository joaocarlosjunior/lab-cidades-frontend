import { Page } from "./page";

export interface ApiResponse<T> {
    content: T[];
    page: Page
  }