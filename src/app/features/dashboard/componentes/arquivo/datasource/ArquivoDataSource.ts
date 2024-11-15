import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, catchError, delay, finalize, Observable, of } from 'rxjs';
import { ApiResponse } from '../../../../../core/interfaces/ApiResponse';
import { Arquivo } from '../../../../../core/models/Arquivo';
import { ArquivoService } from '../../../../../shared/services/arquivo.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

export class ArquivoDataSource implements DataSource<Arquivo> {
  private arquivoSubject = new BehaviorSubject<Arquivo[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);

  public counter$ = this.countSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

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
  }

  carregarArquivos(page = 0, size = 10) {
    const emptyResponse: ApiResponse<Arquivo> = {
      content: [],
      page: {
        totalElements: 0,
        totalPages: 0,
        size: 0,
        number: 0,
      },
    };

    this.loadingSubject.next(true);
    this._arquivoService
      .list(page, size)
      .pipe(
        delay(3000), 
        catchError((error) => {
          this._toastr.error('Erro ao carregar arquivos', 'Erro');
          return of(emptyResponse);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: ApiResponse<Arquivo>) => {
        if (result && result.content && result.content.length > 0) {
          this.arquivoSubject.next(result.content);
          this.countSubject.next(result.page.totalElements);
          this._toastr.success('Arquivos carregados com sucesso', 'Sucesso');
        }
      });
  }

  carregarArquivosPorTitulo(titulo: string, page = 0, size = 10) {
    const emptyResponse: ApiResponse<Arquivo> = {
      content: [],
      page: {
        totalElements: 0,
        totalPages: 0,
        size: 0,
        number: 0,
      },
    };
    this.loadingSubject.next(true);
    this._arquivoService
      .buscarArquivoPorTitulo(titulo, page, size)
      .pipe(
        delay(3000),
        catchError((error) => {
          this._toastr.error(error.error.detail, 'Erro ao carregar arquivo');
          return of(emptyResponse);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: ApiResponse<Arquivo>) => {
        if (result && result.content && result.content.length > 0) {
          this.arquivoSubject.next(result.content);
          this.countSubject.next(result.page.totalElements);
          this._toastr.success('Arquivos carregados com sucesso', 'Sucesso');
        }
      });
  }
}
