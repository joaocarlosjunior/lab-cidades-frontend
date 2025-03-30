import { Autor } from "./Autor";
import { Cidade } from "./Cidade";
import { TipoDocumento } from "./TipoDocumento";

export interface Documento {
    id: number;
    titulo: string;
    descricao: string;
    ano_publicacao: number;
    arquivo_url: string;
    nome_arquivo: string;
    cidade?: Cidade;
    tipo_documento: TipoDocumento;
    autores: Autor[];
    created_at: string;
    updated_at: string;
}