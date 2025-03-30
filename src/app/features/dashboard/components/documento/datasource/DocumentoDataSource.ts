import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/interfaces/ApiResponse';
import { DocumentoService } from '../../../../../shared/services/documento.service';
import { Documento } from '../../../../../core/models/Documento';

export class DocumentoDataSource implements DataSource<Documento> {
  private documentoSubject = new BehaviorSubject<Documento[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  private numeroDocumentoPorPaginaSubject = new BehaviorSubject<number>(0);

  public counter$ = this.countSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public counterNumeroDocumentoPorPagina$ = this.numeroDocumentoPorPaginaSubject.asObservable();

  constructor(
    private _documentoService: DocumentoService,
    private _toastr: ToastrService
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<Documento[]> {
    return this.documentoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.documentoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
    this.numeroDocumentoPorPaginaSubject.complete();
  }

  carregarDocumentos(page: number = 0, size: number = 10) {
    this.loadingSubject.next(true);
    this._documentoService
      .list(page, size)
      .subscribe({
        next: (result: ApiResponse<Documento>) => {
            this.documentoSubject.next(result.content);
            this.countSubject.next(result.page.totalElements);
            this.loadingSubject.next(false);
            this.numeroDocumentoPorPaginaSubject.next(result.content.length);
        },
        error: (error) => {
          switch(error.status) {
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
          this.documentoSubject.next([]);
          this.countSubject.next(0);
          this.loadingSubject.next(false);
          this.numeroDocumentoPorPaginaSubject.next(0);
        },
      }
    );
  }

  carregarDocumentosPorTitulo(titulo: string, page = 0, size = 10) {
    this.loadingSubject.next(true);
    this._documentoService
      .buscarDocumentoPorTitulo(titulo, page, size)
      .subscribe({
        next: (result: ApiResponse<Documento>) => {
            this.documentoSubject.next(result.content);
            this.countSubject.next(result.page.totalElements);
            this.loadingSubject.next(false);
            this.numeroDocumentoPorPaginaSubject.next(result.content.length);
        },
        error: (error) => {
          switch(error.status) {
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
          this.documentoSubject.next([]);
          this.countSubject.next(0);
          this.loadingSubject.next(false);
          this.numeroDocumentoPorPaginaSubject.next(0);
        },
      }
    );
  }
}
