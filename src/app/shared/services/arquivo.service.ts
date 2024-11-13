import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ArquivoResponse } from '../../core/interfaces/ArquivoResponse';
import { Arquivo } from '../../core/models/Arquivo';

@Injectable({
  providedIn: 'root',
})
export class ArquivoService {
  private readonly API = `${environment.apiUrl}/arquivos`;

  constructor(private httpClient: HttpClient) {}

  list(page: number = 0, size: number = 10): Observable<ArquivoResponse> {
      return this.httpClient.get<ArquivoResponse>(this.API, { params: { page, size} });
  }

  buscarAssunto(assunto: string) {
    assunto = assunto.trim();

    let params = new HttpParams()
    .set('q', assunto);

    return this.httpClient.get<ArquivoResponse>(this.API + '/search', { params }).pipe(
      map((response) => {
        return response.content;
      })
    );
  }

  buscaAvancada(query: string, source: number) {
    const options = query
      ? {
          params: new HttpParams().set('q', query).set('source', source), // Adiciona o segundo parâmetro 'source'
        }
      : {};

    return this.httpClient
      .get<ArquivoResponse>(this.API + '/search-advanced', options)
      .pipe(
        map((response) => {
          return response.content;
        })
      );
  }

  getArquivoByCode(code: any) {
    const options = { params: new HttpParams().set('id', code) };
    return this.httpClient.get<Arquivo>(this.API + '/{id}', options).pipe(
      map((response) => {
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
    return this.httpClient.get<ArquivoResponse>(this.API + '/titulo', { params: { q, page, size} });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
