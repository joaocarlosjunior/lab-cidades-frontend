import { Author } from "./Author";
import { City } from "./City";
import { DocumentType } from "./DocumentType";

export interface Document {
    id: number;
    titulo: string;
    descricao: string;
    ano_publicacao: number;
    arquivo_url: string;
    nome_arquivo: string;
    cidade?: City;
    tipo_documento: DocumentType;
    autores: Author[];
    created_at: string;
    updated_at: string;
}