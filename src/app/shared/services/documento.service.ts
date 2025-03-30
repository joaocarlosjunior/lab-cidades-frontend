import {
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../core/interfaces/ApiResponse';
import { Arquivo } from '../../core/models/Arquivo';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private readonly API = `${environment.apiUrl}/documentos`;

  constructor(private httpClient: HttpClient) {}

  list(page: number, size: number ): Observable<ApiResponse<Arquivo>> {
      return this.httpClient.get<ApiResponse<Arquivo>>(this.API, { params: { page, size} });
  }

  buscarAssunto(q: string, page: number, size: number): Observable<ApiResponse<Arquivo>> {
    return this.httpClient.get<ApiResponse<Arquivo>>(this.API + '/search', { params: { q, page, size } });
  }

  buscaAvancada(q: string, source: number, page: number, size: number): Observable<ApiResponse<Arquivo>> {
    return this.httpClient
      .get<ApiResponse<Arquivo>>(this.API + '/search-advanced', { params: { q, source, page, size} });
  }

  getArquivoByCode(id: number): Observable<Arquivo> {
    return this.httpClient
    .get<Arquivo>(`${this.API}/${id}`)
    .pipe(
      map((response) =>{
        return response;
      })
    );
  }

  criarArquivo(formData: FormData) {
    return this.httpClient.post<void>(this.API, formData);
  }

  downloadArquivo(arquivoId: number) {
    return this.httpClient.get(`${this.API}/arquivo/${arquivoId}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  buscarArquivoPorTitulo(q: string, page: number = 0, size: number = 10){
    return this.httpClient.get<ApiResponse<Arquivo>>(this.API + '/titulo', { params: { q, page, size} });
  }

  editarArquivo(formData: FormData, id: number){
    return this.httpClient.put(`${this.API}/${id}`, formData)
  }

  deletarArquivo(id: number){
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  removerArquivoPeloIdDocumento(id: number){
    return this.httpClient.patch(`${this.API}/remove-arquivo/documento/${id}`, {});
  }
}
