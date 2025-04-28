import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/interfaces/ApiResponse';
import { Document } from '../../../../../core/models/Document';
import { DocumentService } from '../../../../../shared/services/document.service';

export class DocumentDataSource implements DataSource<Document> {
  private documentSubject = new BehaviorSubject<Document[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  private numeroDocumentoPorPaginaSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public counterNumeroDocumentoPorPagina$ =
    this.numeroDocumentoPorPaginaSubject.asObservable();

  constructor(
    private _documentService: DocumentService,
    private _toastr: ToastrService,
    private _destroyRef: DestroyRef
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<Document[]> {
    return this.documentSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.documentSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
    this.numeroDocumentoPorPaginaSubject.complete();
  }

  getPaginatedDocuments(page: number = 0, size: number = 10) {
    this.loadingSubject.next(true);
    this._documentService
      .list(page, size)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (result: ApiResponse<Document>) => {
          this.documentSubject.next(result.content);
          this.countSubject.next(result.page.totalElements);
          this.loadingSubject.next(false);
          this.numeroDocumentoPorPaginaSubject.next(result.content.length);
        },
        error: (error) => {
          switch (error.status) {
            case 401:
              this._toastr.error('Não autorizado', 'Erro');
              break;
            case 404:
              this._toastr.error('Nenhum documento encontrado', 'Erro');
              break;
            default:
              this._toastr.error('Erro ao carregar documentos', 'Erro');
              break;
          }
          this.documentSubject.next([]);
          this.countSubject.next(0);
          this.loadingSubject.next(false);
          this.numeroDocumentoPorPaginaSubject.next(0);
        },
      });
  }

  getDocumentsByTitle(titleDocument: string, page = 0, size = 10) {
    this.loadingSubject.next(true);
    this._documentService
      .searchDocumentByTitle(titleDocument, page, size)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (result: ApiResponse<Document>) => {
          this.documentSubject.next(result.content);
          this.countSubject.next(result.page.totalElements);
          this.loadingSubject.next(false);
          this.numeroDocumentoPorPaginaSubject.next(result.content.length);
        },
        error: (error) => {
          switch (error.status) {
            case 401:
              this._toastr.error('Não autorizado', 'Erro');
              break;
            case 404:
              this._toastr.error('Nenhum documento encontrado', 'Erro');
              break;
            default:
              this._toastr.error('Erro ao carregar documentos', 'Erro');
              break;
          }
          this.documentSubject.next([]);
          this.countSubject.next(0);
          this.loadingSubject.next(false);
          this.numeroDocumentoPorPaginaSubject.next(0);
        },
      });
  }
}
