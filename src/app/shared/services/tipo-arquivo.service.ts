import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TipoArquivo } from '../../core/models/TipoArquivo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoArquivoService {
  private readonly API = `${environment.apiUrl}/tipo-arquivo`;

  constructor(private httpClient: HttpClient) { }

  list(): Observable<TipoArquivo[]> { 
    return this.httpClient.get<TipoArquivo[]>(this.API);
  }
}
