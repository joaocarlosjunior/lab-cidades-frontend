import { DataSource } from '@angular/cdk/table';
import { TipoArquivo } from "../../../../../core/models/TipoArquivo";
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { TipoArquivoService } from '../../../../../shared/services/tipo-arquivo.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../../../core/interfaces/ApiResponse';

export class TipoArquivoDataSource implements DataSource<TipoArquivo>{
    private tipoArquivoSubject = new BehaviorSubject<TipoArquivo[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(
        private _tipoArquivoService: TipoArquivoService,
        private _toastr: ToastrService
    ){}

    connect(collectionViewer: CollectionViewer): Observable<TipoArquivo[]> {
        return this.tipoArquivoSubject.asObservable();
    }
    
    disconnect(collectionViewer: CollectionViewer): void {
        this.tipoArquivoSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    carregarTiposArquivo(page = 0, size = 10){
        const emptyResponse: ApiResponse<TipoArquivo> = {
            content: [],
            page: {
              totalElements: 0,
              totalPages: 0,
              size: 0,
              number: 0,
            },
          };

        this.loadingSubject.next(true);
        this._tipoArquivoService
        .listarPaginado(page, size)
        .pipe(
            catchError((error) => {
                this._toastr.error('Erro ao carregar tipos arquivos', 'Erro');
                return of(emptyResponse);
            }),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((result: ApiResponse<TipoArquivo>) => {
            if (result && result.content && result.content.length > 0) {
              this.tipoArquivoSubject.next(result.content);
              this.countSubject.next(result.page.totalElements);
              this._toastr.success('Tipos Arquivos carregados com sucesso', 'Sucesso');
            }
          });
    }

}