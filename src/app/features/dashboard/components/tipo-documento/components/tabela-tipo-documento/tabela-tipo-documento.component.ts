import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { take, tap } from 'rxjs';
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

  constructor(
    private _tipoDocumentoService: TipoDocumentoService,
    private _toastr: ToastrService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.tipoDocumentoDataSource = new TipoDocumentoDataSource(
      this._tipoDocumentoService,
      this._toastr
    );

    this.tipoDocumentoDataSource.carregarTiposDocumento();
    this.tipoDocumentoDataSource.loading$.subscribe((loading) => {
      this.carregando = loading;
    });
  }

  ngAfterViewInit(): void {
    this.carregarTodosTiposDocumento();
  }

  carregarTodosTiposDocumento() {
    this.tipoDocumentoDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.paginator.page.pipe(tap(() => this.carregarTiposDocumento())).subscribe();
  }

  carregarTiposDocumento(){
    this.tipoDocumentoDataSource.carregarTiposDocumento(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );

    // Atualiza o total de elementos no paginator
    this.tipoDocumentoDataSource.counter$.pipe(take(1)).subscribe((count) => {
      this.paginator.length = count;
    });
  }

  onClickEditarTipoDocumento(id: number){
    this.abrirModalDocumento(id, 'Editar Tipo Documento');
  }

  onDeletarTipoDocumento(id: number){
    this._tipoDocumentoService
    .deletarTipoDocumento(id)
    .subscribe({
      next: () => {
        this._toastr.success('', 'Tipo Documento Deletado');

        this.tipoDocumentoDataSource.counterTipoDocumentoPage$
        .pipe(take(1))
        .subscribe((count) => {
          if((count - 1) === 0){
            this.paginator.pageIndex = Math.max(this.paginator.pageIndex - 1, 0);
            this.carregarTiposDocumento();
          }else{
            this.carregarTiposDocumento();
          }
        });
      },
      error: () => this._toastr.error('Erro ao deletar tipo documento'),
    })
  }

  abrirModalDocumento(id: number, titulo: string) {
    this._dialog
    .open(ModalFormTipoDocumentoComponent, {
      width: 'auto',
      height: 'auto',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        tituloModal: titulo,
        id: id,
      },
    })
    .afterClosed().subscribe(() => {this.carregarTiposDocumento()})
  }

}
