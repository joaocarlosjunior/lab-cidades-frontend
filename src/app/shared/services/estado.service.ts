import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Estado } from '../../core/models/Estado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private readonly API = `${environment.apiUrl}/estado`;

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Estado[]> { 
    return this.httpClient.get<Estado[]>(this.API);
  }
}
