import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/interfaces/ApiResponse';
import { City } from '../../../../../core/models/City';
import {
  CityService
} from '../../../../../shared/services/city.service';

export class LocalityDataSource implements DataSource<City> {
  private localitySubject = new BehaviorSubject<City[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  private numeroLocalidadePorPaginaSubject = new BehaviorSubject<number>(0);

  public counter$ = this.countSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public counterNumeroLocalidadePorPagina$ =
    this.numeroLocalidadePorPaginaSubject.asObservable();

  constructor(
    private _cityService: CityService,
    private _toastr: ToastrService,
    private _destroyRef: DestroyRef
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<readonly City[]> {
    return this.localitySubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.localitySubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
    this.numeroLocalidadePorPaginaSubject.complete();
  }

  loadLocations(page: number = 0, size: number = 10) {
    this.loadingSubject.next(true);

    this._cityService
    .list(page, size)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (result: ApiResponse<City>) => {
        this.localitySubject.next(result.content);
        this.countSubject.next(result.page.totalElements);
        this.loadingSubject.next(false);
        this.numeroLocalidadePorPaginaSubject.next(result.content.length);
      },
      error: (error) => {
        switch (error.status) {
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
        this.localitySubject.next([]);
        this.countSubject.next(0);
        this.loadingSubject.next(false);
        this.numeroLocalidadePorPaginaSubject.next(0);
      },
    });
  }

  loadCityByCityName(
    nomeCidade: string,
    page: number = 0,
    size: number = 0
  ) {
    this.loadingSubject.next(true);

    this._cityService
    .listCityByCityName(nomeCidade, page, size)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (result: ApiResponse<City>) => {
        this.localitySubject.next(result.content);
        this.countSubject.next(result.page.totalElements);
        this.loadingSubject.next(false);
        this.numeroLocalidadePorPaginaSubject.next(result.content.length);
      },
      error: (error) => {
        switch (error.status) {
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
        this.localitySubject.next([]);
        this.countSubject.next(0);
        this.loadingSubject.next(false);
        this.numeroLocalidadePorPaginaSubject.next(0);
      },
    });
  }

  deleteCityByIdCity(idCity: number) {
    this._cityService
    .deleteCityById(idCity)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: () => this._toastr.success('Cidade deletada com sucesso'),
      error: () => this._toastr.error('Erro ao deletar cidade'),
    });
  }
}
