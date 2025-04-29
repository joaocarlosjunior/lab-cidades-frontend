import { AfterViewInit, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { take, tap } from 'rxjs';
import { CityService } from '../../../../../../shared/services/city.service';
import { LocalityDataSource } from '../../datasource/LocalityDataSource';
import { ModalFormLocalidadeComponent } from '../modal-form-localidade/modal-form-localidade.component';

@Component({
  selector: 'app-tabela-localidade',
  templateUrl: './tabela-localidade.component.html',
  styleUrl: './tabela-localidade.component.scss',
})
export class TabelaLocalidadeComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'id',
    'nomeCidade',
    'estado',
    'mesorregiao',
    'criadoEm',
    'atualizadoEm',
    'acao',
  ];
  localityDataSource!: LocalityDataSource;
  loading: boolean = true;
  currentSearchTerm: string = '';
  private destroyRef = inject(DestroyRef);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _cityService: CityService,
    private _dialog: MatDialog,
    private _toastr: ToastrService,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeDataSource();
    this.configureSubscriptions();
  }

  ngAfterViewInit(): void {
    this.configurePaginator();
    this.loadInitialData();
  }

  private initializeDataSource(): void {
    this.localityDataSource = new LocalityDataSource(
      this._cityService,
      this._toastr,
      this.destroyRef
    );
  }

  private configureSubscriptions(): void {
    this.localityDataSource.loading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loading) => {
        this.loading = loading;
        this._cdRef.detectChanges();
      });

    this.localityDataSource.counter$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((total) => {
        if(this.paginator){
          this.paginator.length = total;
        }
      });
  }

  private configurePaginator(): void {
    this.paginator.page
      .pipe(
        tap(() => this.loadLocations()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private loadInitialData(): void {
    this.loadLocations();
  }

  private loadLocations(): void {
    if (this.currentSearchTerm) {
      this.loadLocatityByCityName();
    } else {
      this.loadAllLocations();
    }
  }

  private loadLocatityByCityName(): void {
    this.localityDataSource.loadCityByCityName(
      this.currentSearchTerm,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  private loadAllLocations(): void {
    this.localityDataSource.loadLocations(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  reloadTable(): void {
    this.currentSearchTerm = '';
    this.loadLocations();
  }

  searchByCityName(event: Event): void {
    const elemento = event.target as HTMLInputElement;
    this.currentSearchTerm = elemento.value.trim();
    this.loadLocations();
  }

  onClickEditLocalityByIdCity(id: number): void {
    this.openModalLocality(id, 'Editar Cidade');
  }

  onClickDeleteLocalityByIdCity(id: number): void {
    if (id) {
      this._cityService
      .deleteCityById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this._toastr.success('Localidade removida com sucesso');
          this.adjustPaginationAfterDeletingCity();
        },
        error: (err) => {
          switch(err.status){
            case 409:
              this._toastr.error('Não é possivel remover está localidade');
              break;
            default:
              this._toastr.error('Erro ao deletar');
          }
        },
      });
    } else {
      this._toastr.error('ID inválido');
    }
  }

  private adjustPaginationAfterDeletingCity(): void {
    this.localityDataSource.counterNumeroLocalidadePorPagina$
      .pipe(take(1))
      .subscribe((total) => {
        if (total - 1 === 0) {
          this.paginator.pageIndex = Math.max(this.paginator.pageIndex - 1, 0);
        }
        this.loadAllLocations();
      });
  }

  private openModalLocality(id: number, titulo: string): void {
    this._dialog
      .open(ModalFormLocalidadeComponent, {
        width: 'auto',
        height: 'auto',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          modalTitle: titulo,
          id: id,
        },
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.reloadTable());
  }
}
