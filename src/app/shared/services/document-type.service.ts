import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../core/interfaces/ApiResponse';
import { DocumentType } from '../../core/models/DocumentType';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  private readonly API = `${environment.apiUrl}/tipos-documento`;

  constructor(private httpClient: HttpClient) { }

  loadingDocumentTypes(page: number = 0, size: number = 10): void {
    this.httpClient
      .get<ApiResponse<DocumentType>>(this.API + '/all', {
        params: { page, size },
      })
  }

  listPaginatedDocumentTypes(page: number = 0, size: number = 10): Observable<ApiResponse<DocumentType>> {
    return this.httpClient
    .get<ApiResponse<DocumentType>>(this.API + '/all', { params: { page, size} });
  }

  listAllDocumentTypes(): Observable<DocumentType[]>{
    return this.httpClient.get<DocumentType[]>(this.API);
  }

  registerDocumentType(nome_tipo_documento: string){
    return this.httpClient.post<void>(this.API, { nome_tipo_documento });
  }

  searchDocumentTypeById(id: number){
    return this.httpClient.get<DocumentType>(`${this.API}/${id}`);
  }

  editDocumentType(id: number, nome_tipo_documento: string){
    return this.httpClient.put(`${this.API}/${id}`, { nome_tipo_documento });
  }

  deleteDocumentType(id: number){
    return this.httpClient.delete(`${this.API}/${id}`)
  }
}
