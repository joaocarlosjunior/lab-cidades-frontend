import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Cidade } from '../../../../../core/models/Cidade';
import { BehaviorSubject, Observable } from 'rxjs';
import { CidadeService } from '../../../../../shared/services/cidade.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../../../core/interfaces/ApiResponse';

export class LocalidadeDataSource implements DataSource<Cidade> {
  private localidadeSubject = new BehaviorSubject<Cidade[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  private numeroLocalidadePorPaginaSubject = new BehaviorSubject<number>(0);

  public counter$ = this.countSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public counterNumeroLocalidadePorPagina$ = this.numeroLocalidadePorPaginaSubject.asObservable();

  constructor(
    private _cidadeService: CidadeService,
    private _toastr: ToastrService
  ){}

  connect(collectionViewer: CollectionViewer): Observable<readonly Cidade[]> {
    return this.localidadeSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.localidadeSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
    this.numeroLocalidadePorPaginaSubject.complete();
  }

  carregarLocalidades(page: number = 0, size: number = 10){
    this.loadingSubject.next(true);

    this._cidadeService
    .list(page,size)
    .subscribe({
      next: (result: ApiResponse<Cidade>) => {
        this.localidadeSubject.next(result.content);
        this.countSubject.next(result.page.totalElements);
        this.loadingSubject.next(false);
        this.numeroLocalidadePorPaginaSubject.next(result.content.length);
      },
      error: (error) => {
        switch(error.status) {
          case 401:
            this._toastr.error('Não autorizado', 'Erro');
            break;
          case 404:
            this._toastr.error('Nenhuma localidade encontrado', 'Erro');
            break;
          default:
            this._toastr.error('Erro ao carregar localidade', 'Erro');
            break;
        }
        this.localidadeSubject.next([]);
        this.countSubject.next(0);
        this.loadingSubject.next(false);
        this.numeroLocalidadePorPaginaSubject.next(0);
      },
    })
  }

  carregarLocalidadesPeloNomeCidade(nomeCidade: string, page: number = 0, size: number = 0){
    this.loadingSubject.next(true);

    this._cidadeService
    .listarCidadesPeloNome(nomeCidade,page,size)
    .subscribe({
      next: (result: ApiResponse<Cidade>) => {
        this.localidadeSubject.next(result.content);
        this.countSubject.next(result.page.totalElements);
        this.loadingSubject.next(false);
        this.numeroLocalidadePorPaginaSubject.next(result.content.length);
      },
      error: (error) => {
        switch(error.status) {
          case 401:
            this._toastr.error('Não autorizado', 'Erro');
            break;
          case 404:
            this._toastr.error('Nenhuma localidade encontrado', 'Erro');
            break;
          default:
            this._toastr.error('Erro ao carregar localidade', 'Erro');
            break;
        }
        this.localidadeSubject.next([]);
        this.countSubject.next(0);
        this.loadingSubject.next(false);
        this.numeroLocalidadePorPaginaSubject.next(0);
      },
    })
  }

  deletarCidadePeloId(idCidade: number){
    this._cidadeService.deletarCidade(idCidade)
    .subscribe({
      next: () => this._toastr.success('Cidade deletada com sucesso'),
      error: () => this._toastr.error('Erro ao deletar cidade')
    });
  }
}
