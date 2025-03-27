import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../core/interfaces/ApiResponse';
import { TipoArquivo } from '../../core/models/TipoArquivo';

@Injectable({
  providedIn: 'root'
})
export class TipoArquivoService {
  private readonly API = `${environment.apiUrl}/tipo-arquivo`;

  constructor(private httpClient: HttpClient) { }

  carregarTiposArquivo(page: number = 0, size: number = 10): void {
    this.httpClient
      .get<ApiResponse<TipoArquivo>>(this.API + '/all', {
        params: { page, size },
      })
  }

  listarPaginado(page: number = 0, size: number = 10): Observable<ApiResponse<TipoArquivo>> {
    return this.httpClient
    .get<ApiResponse<TipoArquivo>>(this.API + '/all', { params: { page, size} });
  }

  list(): Observable<TipoArquivo[]>{
    return this.httpClient.get<TipoArquivo[]>(this.API);
  }

  criarTipoArquivo(nome_tipo_arquivo: string){
    return this.httpClient.post<void>(this.API, {nome_tipo_arquivo}).pipe(
      finalize(() => this.carregarTiposArquivo())
    );
  }

  buscarTipoArquivoPeloId(id: number){
    return this.httpClient.get<TipoArquivo>(`${this.API}/${id}`);
  }

  editarTipoArquivo(id: number, nome_tipo_arquivo: string){
    return this.httpClient.put(`${this.API}/${id}`, { nome_tipo_arquivo }).pipe(
      finalize(() => this.carregarTiposArquivo())
    );
  }

  deletarTipoArquivo(id: number){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(
      finalize(() => this.carregarTiposArquivo())
    );
  }
}
