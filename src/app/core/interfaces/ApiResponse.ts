import { Arquivo } from "../models/Arquivo";

export interface ApiResponse {
    content: Arquivo[];
    pageable: any; // Defina um tipo mais específico se necessário
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
  }