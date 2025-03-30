import {
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../core/interfaces/ApiResponse';
import { Documento } from '../../core/models/Documento';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private readonly API = `${environment.apiUrl}/documentos`;

  constructor(private httpClient: HttpClient) {}

  list(page: number, size: number ): Observable<ApiResponse<Documento>> {
      return this.httpClient.get<ApiResponse<Documento>>(this.API, { params: { page, size} });
  }

  buscarAssunto(q: string, page: number, size: number): Observable<ApiResponse<Documento>> {
    return this.httpClient.get<ApiResponse<Documento>>(this.API + '/search', { params: { q, page, size } });
  }

  buscaAvancada(q: string, source: number, page: number, size: number): Observable<ApiResponse<Documento>> {
    return this.httpClient
      .get<ApiResponse<Documento>>(this.API + '/search-advanced', { params: { q, source, page, size} });
  }

  getDocumentoByCode(id: number): Observable<Documento> {
    return this.httpClient
    .get<Documento>(`${this.API}/${id}`)
    .pipe(
      map((response) =>{
        return response;
      })
    );
  }

  criarDocumento(formData: FormData) {
    return this.httpClient.post<void>(this.API, formData);
  }

  downloadArquivo(DocumentoId: number) {
    return this.httpClient.get(`${this.API}/arquivo/${DocumentoId}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  buscarDocumentoPorTitulo(q: string, page: number = 0, size: number = 10){
    return this.httpClient.get<ApiResponse<Documento>>(this.API + '/titulo', { params: { q, page, size} });
  }

  editarDocumento(formData: FormData, id: number){
    return this.httpClient.put(`${this.API}/${id}`, formData)
  }

  deletarDocumento(id: number){
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  removerArquivoPeloIdDocumento(id: number){
    return this.httpClient.patch(`${this.API}/remover-arquivo/documento/${id}`, {});
  }
}
