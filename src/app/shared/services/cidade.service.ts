import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Cidade } from '../../core/models/Cidade';
import { Observable } from 'rxjs';
import { RequestCidadeDTO } from '../../core/dtos/RequestCidadeDTO';
import { DadosSimplesCidade } from '../../core/interfaces/DadosSimplesCidade';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private readonly API = `${environment.apiUrl}/cidade`;

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Cidade[]> {
    return this.httpClient.get<Cidade[]>(this.API);
  }

  listaCidadesPeloIdEstado(idEstado: number): Observable<DadosSimplesCidade[]> {
    return this.httpClient.get<DadosSimplesCidade[]>(`${this.API}/estado/${idEstado}`);
  }

  cadastrarCidade(dadosCidade: RequestCidadeDTO){
    return this.httpClient.post<void>(this.API, dadosCidade);
  }
}
