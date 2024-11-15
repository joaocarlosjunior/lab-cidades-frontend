import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../core/interfaces/ApiResponse';
import { TipoArquivo } from '../../core/models/TipoArquivo';

@Injectable({
  providedIn: 'root'
})
export class TipoArquivoService {
  private readonly API = `${environment.apiUrl}/tipo-arquivo`;

  constructor(private httpClient: HttpClient) { }

  listarPaginado(page: number = 0, size: number = 10): Observable<ApiResponse<TipoArquivo>> { 
    return this.httpClient.get<ApiResponse<TipoArquivo>>(this.API + '/all', { params: { page, size} });
  }

  list(): Observable<TipoArquivo[]>{
    return this.httpClient.get<TipoArquivo[]>(this.API);
  }
}
