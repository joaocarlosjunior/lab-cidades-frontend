import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { State } from '../../core/models/State';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly API = `${environment.apiUrl}/estados`;

  constructor(private httpClient: HttpClient) { }

  list(): Observable<State[]> {
    return this.httpClient.get<State[]>(this.API);
  }
}
