import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../core/interfaces/LoginResponse';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API = `${environment.apiUrl}/auth`;

  constructor(private _httpClient: HttpClient) { }

  login(login: string, password: string){
    return this._httpClient.post<LoginResponse>(this.API + "/login", { login, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
      })
    )
  }
}
