import { Mesorregiao } from "./Mesorregiao";
import { State } from "./State";

export interface City{
    id: number;
    nome_cidade: string;
    mesorregiao: Mesorregiao;
    estado: State;
    created_at: string;
    updated_at: string;
}