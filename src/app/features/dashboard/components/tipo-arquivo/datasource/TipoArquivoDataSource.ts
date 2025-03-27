import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, finalize, Observable, of, Subject } from 'rxjs';
import { ApiResponse } from '../../../../../core/interfaces/ApiResponse';
import { TipoArquivo } from '../../../../../core/models/TipoArquivo';
import { TipoArquivoService } from '../../../../../shared/services/tipo-arquivo.service';

export class TipoArquivoDataSource implements DataSource<TipoArquivo> {
  private tipoArquivoSubject = new BehaviorSubject<TipoArquivo[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countTotalElementsSubject = new BehaviorSubject<number>(0);
  private countTipoDocumentoPageSubject = new BehaviorSubject<number>(0);

  public counter$ = this.countTotalElementsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public counterTipoDocumentoPage$ = this.countTipoDocumentoPageSubject.asObservable();

  constructor(
    private _tipoArquivoService: TipoArquivoService,
    private _toastr: ToastrService
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<TipoArquivo[]> {
    return this.tipoArquivoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.tipoArquivoSubject.complete();
    this.loadingSubject.complete();
    this.countTotalElementsSubject.complete();
    this.countTipoDocumentoPageSubject.complete();
  }

  carregarTiposDocumento(page: number = 0, size: number = 10) {
    this.loadingSubject.next(true);
    this._tipoArquivoService.listarPaginado(page, size).subscribe({
      next: (result: ApiResponse<TipoArquivo>) => {
        this.tipoArquivoSubject.next(result.content || []);
        this.countTotalElementsSubject.next(result.page.totalElements || 0);
        this.loadingSubject.next(false);
        this.countTipoDocumentoPageSubject.next(result.content.length || 0);
      },
      error: (error) => {
        switch(error.status) {
          case 401:
            this._toastr.error('Não autorizado', 'Erro');
            break;
          case 404:
            this._toastr.error('Nenhum tipo arquivo encontrado', 'Erro');
            break;
          default:
            this._toastr.error('Erro ao carregar tipos arquivos', 'Erro');
            break;
        }
        this.tipoArquivoSubject.next([]);
        this.countTotalElementsSubject.next(0);
        this.loadingSubject.next(false);
        this.countTipoDocumentoPageSubject.next(0);
      },
    });
  }
}
