import { Autor } from "./Autor";
import { Categoria } from "./Categoria";
import { Cidade } from "./Cidade";
import { Localidade } from "./Localidade";
import { PalavraChave } from "./PalavraChave";
import { TipoArquivo } from "./TipoArquivo";

export interface Arquivo {
    id: number;
    titulo: string;
    descricao: string;
    ano_publicacao: number;
    arquivo_url: string;
    nome_arquivo: string;
    cidade?: Cidade;
    tipo_arquivo: TipoArquivo;
    autores: Autor[];
    created_at: string;
    updated_at: string;
}