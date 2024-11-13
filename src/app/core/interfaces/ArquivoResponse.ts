import { Arquivo } from "../models/Arquivo";
import { Page } from "./page";

export interface ArquivoResponse {
    content: Arquivo[];
    page: Page
  }