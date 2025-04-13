import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Cidade } from '../../core/models/Cidade';
import { Observable } from 'rxjs';
import { RequestCidadeDTO } from '../../core/dtos/RequestCidadeDTO';
import { DadosSimplesCidade } from '../../core/interfaces/DadosSimplesCidade';
import { ApiResponse } from '../../core/interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private readonly API = `${environment.apiUrl}/cidades`;

  constructor(private httpClient: HttpClient) { }

  list(page: number = 0, size: number = 10): Observable<ApiResponse<Cidade>> {
    return this.httpClient.get<ApiResponse<Cidade>>(this.API, { params: { page, size} });
  }

  listaCidadesPeloIdEstado(idEstado: number): Observable<DadosSimplesCidade[]> {
    return this.httpClient.get<DadosSimplesCidade[]>(`${this.API}/estado/${idEstado}`);
  }

  listarCidadesPeloNome(nome_cidade: string, page: number = 0, size: number = 10): Observable<ApiResponse<Cidade>>{
    return this.httpClient.get<ApiResponse<Cidade>>(this.API + '/nome-cidade', { params: { nome_cidade, page, size } })
  }

  cadastrarCidade(dadosCidade: RequestCidadeDTO){
    return this.httpClient.post<void>(this.API, dadosCidade);
  }

  getCidadePeloId(idCidade: number): Observable<Cidade>{
    return this.httpClient.get<Cidade>(`${this.API}/${idCidade}`);
  }

  editarCidade(id: number, dto: RequestCidadeDTO){
    return this.httpClient.put(`${this.API}/${id}`, dto)
  }

  deletarCidade(id: number){
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
