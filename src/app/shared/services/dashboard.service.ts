import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly API = `${environment.apiUrl}/dashboard`;

  constructor(private httpClient: HttpClient) {}

  getNumberRegisteredDocuments(){
    return this.httpClient.get<number>(this.API + '/count-documentos');
  }

  getNumberDocumentTypesRegistered(){
    return this.httpClient.get<number>(this.API + '/count-tipo-documentos');
  }
}
