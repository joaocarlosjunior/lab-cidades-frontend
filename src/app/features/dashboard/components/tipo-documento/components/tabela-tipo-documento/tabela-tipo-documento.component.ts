import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { TipoDocumentoService } from '../../../../../../shared/services/tipo-documento.service';
import { TipoDocumentoDataSource } from '../../datasource/TipoDocumentoDataSource';
import { ModalFormTipoDocumentoComponent } from '../modal-form-tipo-documento/modal-form-tipo-documento.component';

@Component({
  selector: 'app-tabela-tipo-documento',
  templateUrl: './tabela-tipo-documento.component.html',
  styleUrl: './tabela-tipo-documento.component.scss'
})
export class TabelaTipoDocumentoComponent implements OnInit, AfterViewInit{
  displayedColumns = [
    'id',
    'tipoDocumento',
    'criadoEm',
    'atualizadoEm',
    'acao',
  ];

  tipoDocumentoDataSource!: TipoDocumentoDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  carregando!: boolean;

  private destroy$ = new Subject<void>();

  constructor(
    private _tipoDocumentoService: TipoDocumentoService,
    private _toastr: ToastrService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.inicializarDataSource();
    this.carregarDadosIniciais();
  }

  ngAfterViewInit(): void {
    this.configurarPaginacao();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private inicializarDataSource(): void {
    this.tipoDocumentoDataSource = new TipoDocumentoDataSource(
      this._tipoDocumentoService,
      this._toastr
    );

    this.tipoDocumentoDataSource.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(carregando => this.carregando = carregando);
  }

  private carregarDadosIniciais(): void {
    this.tipoDocumentoDataSource.carregarTiposDocumento();
  }

  private configurarPaginacao(): void {
    this.tipoDocumentoDataSource.counter$
      .pipe(takeUntil(this.destroy$))
      .subscribe(total => this.paginator.length = total);

    this.paginator.page
      .pipe(
        tap(() => this.carregarTiposDocumento()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  carregarTiposDocumento(): void {
    this.tipoDocumentoDataSource.carregarTiposDocumento(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  onClickEditarTipoDocumento(id: number): void {
    this.abrirModalDocumento(id, 'Editar Tipo Documento');
  }

  onClickDeletarTipoDocumento(id: number): void {
    this._tipoDocumentoService.deletarTipoDocumento(id).subscribe({
      next: () => {
        this._toastr.success('Tipo Documento removido com sucesso');
        this.ajustarPaginacaoAposExclusao();
      },
      error: () => this._toastr.error('Erro ao remover tipo documento')
    });
  }

  private ajustarPaginacaoAposExclusao(): void {
    this.tipoDocumentoDataSource.counterTipoDocumentoPage$
      .pipe(take(1))
      .subscribe(total => {
        if ((total - 1) === 0) {
          this.paginator.pageIndex = Math.max(this.paginator.pageIndex - 1, 0);
        }
        this.carregarTiposDocumento();
      });
  }

  abrirModalDocumento(id: number, titulo: string): void {
    this._dialog.open(ModalFormTipoDocumentoComponent, {
      width: 'auto',
      height: 'auto',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { tituloModal: titulo, id }
    }).afterClosed().subscribe(() => this.carregarTiposDocumento());
  }

}
