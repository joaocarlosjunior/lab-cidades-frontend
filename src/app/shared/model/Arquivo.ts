import { Autor } from "./Autor";
import { Categoria } from "./Categoria";
import { Localidade } from "./Localidade";
import { PalavraChave } from "./PalavraChave";

export interface Arquivo {
    id: number;
    titulo: string;
    descricao: string;
    anoPublicacao: number;
    arquivoUrl: string;
    localidade?: Localidade;
    categorias: Categoria[];
    palavrasChave: PalavraChave[];
    autores: Autor[];
}