import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Cidade } from '../../core/models/Cidade';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private readonly API = `${environment.apiUrl}/cidade`;

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Cidade[]> { 
    return this.httpClient.get<Cidade[]>(this.API);
  }

  listaCidadesPeloIdEstado(idEstado: number): Observable<Cidade[]> { 
    return this.httpClient.get<Cidade[]>(`${this.API}/estado/${idEstado}`);
  }
}
