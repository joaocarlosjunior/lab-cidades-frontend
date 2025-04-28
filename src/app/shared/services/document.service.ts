import {
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../core/interfaces/ApiResponse';
import { Document } from '../../core/models/Document';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private readonly API = `${environment.apiUrl}/documentos`;

  constructor(private httpClient: HttpClient) {}

  list(page: number, size: number ): Observable<ApiResponse<Document>> {
      return this.httpClient.get<ApiResponse<Document>>(this.API, { params: { page, size} });
  }

  searchSubject(q: string, page: number, size: number): Observable<ApiResponse<Document>> {
    return this.httpClient.get<ApiResponse<Document>>(this.API + '/search', { params: { q, page, size } });
  }

  searchAdvanced(q: string, source: number, page: number, size: number): Observable<ApiResponse<Document>> {
    return this.httpClient
      .get<ApiResponse<Document>>(this.API + '/search-advanced', { params: { q, source, page, size} });
  }

  getDocumentById(id: number): Observable<Document> {
    return this.httpClient
    .get<Document>(`${this.API}/${id}`);
  }

  createDocument(formData: FormData) {
    return this.httpClient.post<void>(this.API, formData);
  }

  downloadFile(idDocument: number) {
    return this.httpClient.get(`${this.API}/arquivo/${idDocument}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  searchDocumentByTitle(q: string, page: number = 0, size: number = 10){
    return this.httpClient.get<ApiResponse<Document>>(this.API + '/titulo', { params: { q, page, size} });
  }

  editDocument(formData: FormData, id: number){
    return this.httpClient.put(`${this.API}/${id}`, formData)
  }

  deleteDocument(id: number){
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  removeFileByIdDocument(id: number){
    return this.httpClient.patch(`${this.API}/remover-arquivo/documento/${id}`, {});
  }
}
