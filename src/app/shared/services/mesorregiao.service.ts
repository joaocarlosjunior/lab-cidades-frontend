import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Mesorregiao } from '../../core/models/Mesorregiao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MesorregiaoService {
  private readonly API = `${environment.apiUrl}/mesorregiao`;

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Mesorregiao[]> {
    return this.httpClient.get<Mesorregiao[]>(this.API);
  }

  listarMesorregiaoPeloIdEstado(id: number): Observable<Mesorregiao[]> {
    return this.httpClient.get<Mesorregiao[]>(`${this.API}/estado/${id}`)
  }
}
