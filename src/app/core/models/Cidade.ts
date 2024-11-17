import { Estado } from "./Estado";
import { Mesorregiao } from "./Mesorregiao";

export interface Cidade{
    id: number;
    nome_cidade: string;
    mesorregiao: Mesorregiao;
    estado: Estado;
    created_at: string;
    updated_at: string;
}