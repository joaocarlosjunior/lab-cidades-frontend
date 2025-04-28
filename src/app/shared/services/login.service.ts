import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API = `${environment.apiUrl}/auth`;

  constructor(private _httpClient: HttpClient) {}

  login(login: string, password: string): Observable<any>{
    return this._httpClient.post<void>(this.API + '/login', { login, password },
      {
        withCredentials: true
      }
    );
  }

  checkAuthStatus(): Observable<any>{
    return this._httpClient.get(`${this.API}/check`, {
      withCredentials: true
    });
  }

  refreshToken(): Observable<any> {
    return this._httpClient.post(`${this.API}/refresh-token`, {}, {
      withCredentials: true
    });
  }

  logout(): Observable<any> {
    return this._httpClient.post(`${this.API}/logout`, {}, {
      withCredentials: true
    });
  }
}
