import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/interfaces/ApiResponse';
import { DocumentType } from '../../../../../core/models/DocumentType';
import { DocumentTypeService } from '../../../../../shared/services/document-type.service';

export class DocumentTypeDataSource implements DataSource<DocumentType> {
  private documentTypeSubject = new BehaviorSubject<DocumentType[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countTotalElementsSubject = new BehaviorSubject<number>(0);
  private countTipoDocumentoPageSubject = new BehaviorSubject<number>(0);

  public counter$ = this.countTotalElementsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public counterTipoDocumentoPage$ =
    this.countTipoDocumentoPageSubject.asObservable();

  constructor(
    private _documentTypeService: DocumentTypeService,
    private _toastr: ToastrService,
    private _destroyRef: DestroyRef
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<DocumentType[]> {
    return this.documentTypeSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.documentTypeSubject.complete();
    this.loadingSubject.complete();
    this.countTotalElementsSubject.complete();
    this.countTipoDocumentoPageSubject.complete();
  }

  loadPaginatedDocumentTypes(page: number = 0, size: number = 10) {
    this.loadingSubject.next(true);
    this._documentTypeService
      .listPaginatedDocumentTypes(page, size)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (result: ApiResponse<DocumentType>) => {
          this.documentTypeSubject.next(result.content || []);
          this.countTotalElementsSubject.next(result.page.totalElements || 0);
          this.loadingSubject.next(false);
          this.countTipoDocumentoPageSubject.next(result.content.length || 0);
        },
        error: (error) => {
          switch (error.status) {
            case 401:
              this._toastr.error('Não autorizado', 'Erro');
              break;
            case 404:
              this._toastr.error('Nenhum tipo documento encontrado', 'Erro');
              break;
            default:
              this._toastr.error('Erro ao carregar tipos arquivos', 'Erro');
              break;
          }
          this.documentTypeSubject.next([]);
          this.countTotalElementsSubject.next(0);
          this.loadingSubject.next(false);
          this.countTipoDocumentoPageSubject.next(0);
        },
      });
  }
}
