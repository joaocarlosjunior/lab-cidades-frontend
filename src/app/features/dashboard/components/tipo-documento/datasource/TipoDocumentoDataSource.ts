import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/interfaces/ApiResponse';
import { TipoDocumento } from '../../../../../core/models/TipoDocumento';
import { TipoDocumentoService } from '../../../../../shared/services/tipo-documento.service';

export class TipoDocumentoDataSource implements DataSource<TipoDocumento> {
  private tipoDocumentoSubject = new BehaviorSubject<TipoDocumento[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countTotalElementsSubject = new BehaviorSubject<number>(0);
  private countTipoDocumentoPageSubject = new BehaviorSubject<number>(0);

  public counter$ = this.countTotalElementsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public counterTipoDocumentoPage$ = this.countTipoDocumentoPageSubject.asObservable();

  constructor(
    private _tipoDocumentoService: TipoDocumentoService,
    private _toastr: ToastrService
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<TipoDocumento[]> {
    return this.tipoDocumentoSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.tipoDocumentoSubject.complete();
    this.loadingSubject.complete();
    this.countTotalElementsSubject.complete();
    this.countTipoDocumentoPageSubject.complete();
  }

  carregarTiposDocumento(page: number = 0, size: number = 10) {
    this.loadingSubject.next(true);
    this._tipoDocumentoService.listarPaginado(page, size).subscribe({
      next: (result: ApiResponse<TipoDocumento>) => {
        this.tipoDocumentoSubject.next(result.content || []);
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
            this._toastr.error('Nenhum tipo documento encontrado', 'Erro');
            break;
          default:
            this._toastr.error('Erro ao carregar tipos arquivos', 'Erro');
            break;
        }
        this.tipoDocumentoSubject.next([]);
        this.countTotalElementsSubject.next(0);
        this.loadingSubject.next(false);
        this.countTipoDocumentoPageSubject.next(0);
      },
    });
  }
}
