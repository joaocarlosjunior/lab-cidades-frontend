import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ApiResponse } from '../../core/interfaces/ApiResponse';
import { Arquivo } from '../../core/models/Arquivo';

@Injectable({
  providedIn: 'root',
})
export class ArquivoService {
  private readonly API = 'http://localhost:8080/api/v1/arquivos';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Arquivo[]>(this.API);
  }

  buscarAssunto(assunto: string) {
    assunto = assunto.trim();

    console.log('Assunto: ' + assunto);

    const options = assunto
      ? { params: new HttpParams().set('assunto', assunto) }
      : {};

    return this.httpClient.get<ApiResponse>(this.API + '/search', options).pipe(
      map((response) => {
        return response.content;
      }),
      catchError(this.handleError)
    );
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
