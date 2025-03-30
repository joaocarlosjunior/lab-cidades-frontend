import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../core/interfaces/ApiResponse';
import { TipoDocumento } from '../../core/models/TipoDocumento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private readonly API = `${environment.apiUrl}/tipos-documento`;

  constructor(private httpClient: HttpClient) { }

  carregarTiposDocumento(page: number = 0, size: number = 10): void {
    this.httpClient
      .get<ApiResponse<TipoDocumento>>(this.API + '/all', {
        params: { page, size },
      })
  }

  listarPaginado(page: number = 0, size: number = 10): Observable<ApiResponse<TipoDocumento>> {
    return this.httpClient
    .get<ApiResponse<TipoDocumento>>(this.API + '/all', { params: { page, size} });
  }

  list(): Observable<TipoDocumento[]>{
    return this.httpClient.get<TipoDocumento[]>(this.API);
  }

  criarTipoDocumento(nome_tipo_documento: string){
    return this.httpClient.post<void>(this.API, {nome_tipo_documento}).pipe(
      finalize(() => this.carregarTiposDocumento())
    );
  }

  buscarTipoDocumentoPeloId(id: number){
    return this.httpClient.get<TipoDocumento>(`${this.API}/${id}`);
  }

  editarTipoDocumento(id: number, nome_tipo_documento: string){
    return this.httpClient.put(`${this.API}/${id}`, { nome_tipo_documento }).pipe(
      finalize(() => this.carregarTiposDocumento())
    );
  }

  deletarTipoDocumento(id: number){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(
      finalize(() => this.carregarTiposDocumento())
    );
  }
}
