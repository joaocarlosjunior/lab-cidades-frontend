import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { RequestCityDTO } from '../../core/dtos/RequestCityDTO';
import { ApiResponse } from '../../core/interfaces/ApiResponse';
import { SimpleCityData } from '../../core/interfaces/SimpleCityData';
import { City } from '../../core/models/City';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private readonly API = `${environment.apiUrl}/cidades`;

  constructor(private httpClient: HttpClient) { }

  list(page: number = 0, size: number = 10): Observable<ApiResponse<City>> {
    return this.httpClient.get<ApiResponse<City>>(this.API, { params: { page, size} });
  }

  listCityByIdState(idState: number): Observable<SimpleCityData[]> {
    return this.httpClient.get<SimpleCityData[]>(`${this.API}/estado/${idState}`);
  }

  listCityByCityName(nome_cidade: string, page: number = 0, size: number = 10): Observable<ApiResponse<City>>{
    return this.httpClient.get<ApiResponse<City>>(this.API + '/nome-cidade', { params: { nome_cidade, page, size } })
  }

  registrerCity(cityData: RequestCityDTO){
    return this.httpClient.post<void>(this.API, cityData);
  }

  getCityById(idCity: number): Observable<City>{
    return this.httpClient.get<City>(`${this.API}/${idCity}`);
  }

  editCityById(id: number, dto: RequestCityDTO){
    return this.httpClient.put(`${this.API}/${id}`, dto)
  }

  deleteCityById(id: number){
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
