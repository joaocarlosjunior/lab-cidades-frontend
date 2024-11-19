import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly API = `${environment.apiUrl}/dashboard`;

  constructor(private httpClient: HttpClient) {}

  getQuantidadeArquivoCadastrado(){
    return this.httpClient.get<number>(this.API + '/count-arquivo');
  }

  getQuantidadeTipoArquivoCadastrado(){
    return this.httpClient.get<number>(this.API + '/count-tipo-arquivo');
  }
}
