import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { ApiResponse } from '../../../../../core/interfaces/ApiResponse';
import { Arquivo } from '../../../../../core/models/Arquivo';
import { ArquivoService } from '../../../../../shared/services/arquivo.service';

export class ArquivoDataSource implements DataSource<Arquivo> {
  private arquivoSubject = new BehaviorSubject<Arquivo[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  private numeroDocumentoPorPaginaSubject = new BehaviorSubject<number>(0);

  public counter$ = this.countSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public counterNumeroDocumentoPorPagina$ = this.numeroDocumentoPorPaginaSubject.asObservable();

  constructor(
    private _arquivoService: ArquivoService,
    private _toastr: ToastrService
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<Arquivo[]> {
    return this.arquivoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.arquivoSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
    this.numeroDocumentoPorPaginaSubject.complete();
  }

  carregarArquivos(page: number = 0, size: number = 10) {
    this.loadingSubject.next(true);
    this._arquivoService
      .list(page, size)
      .subscribe({
        next: (result: ApiResponse<Arquivo>) => {
            this.arquivoSubject.next(result.content);
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
              this._toastr.error('Nenhum arquivo encontrado', 'Erro');
              break;
            default:
              this._toastr.error('Erro ao carregar documentos', 'Erro');
              break;
          }
          this.arquivoSubject.next([]);
          this.countSubject.next(0);
          this.loadingSubject.next(false);
          this.numeroDocumentoPorPaginaSubject.next(0);
        },
      }
    );
  }

  carregarArquivosPorTitulo(titulo: string, page = 0, size = 10) {
    this.loadingSubject.next(true);
    this._arquivoService
      .buscarArquivoPorTitulo(titulo, page, size)
      .subscribe({
        next: (result: ApiResponse<Arquivo>) => {
            this.arquivoSubject.next(result.content);
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
              this._toastr.error('Nenhum arquivo encontrado', 'Erro');
              break;
            default:
              this._toastr.error('Erro ao carregar documentos', 'Erro');
              break;
          }
          this.arquivoSubject.next([]);
          this.countSubject.next(0);
          this.loadingSubject.next(false);
          this.numeroDocumentoPorPaginaSubject.next(0);
        },
      }
    );
  }
}
