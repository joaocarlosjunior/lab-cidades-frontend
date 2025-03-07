import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TipoArquivoDataSource } from '../../datasource/TipoArquivoDataSource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TipoArquivoService } from '../../../../../../shared/services/tipo-arquivo.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TipoArquivoModalComponent } from '../tipo-arquivo-modal/tipo-arquivo-modal.component';
import { TipoArquivo } from '../../../../../../core/models/TipoArquivo';

@Component({
  selector: 'app-tipo-arquivo-table',
  templateUrl: './tipo-arquivo-table.component.html',
  styleUrl: './tipo-arquivo-table.component.scss'
})
export class TipoArquivoTableComponent implements OnInit, AfterViewInit{
  displayedColumns = [
    'id',
    'tipoArquivo',
    'criadoEm',
    'atualizadoEm',
    'acao',
  ];

  tipoArquivoDataSource!: TipoArquivoDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  carregando!: boolean;

  constructor(
    private _tipoArquivoService: TipoArquivoService,
    private _toastr: ToastrService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.tipoArquivoDataSource = new TipoArquivoDataSource(
      this._tipoArquivoService,
      this._toastr
    );


    this.tipoArquivoDataSource.carregarTiposArquivo();
    this.tipoArquivoDataSource.loading$.subscribe((loading) => {
      this.carregando = loading;
    });
  }

  ngAfterViewInit(): void {
    this.carregarTodosTiposArquivo();
  }

  carregarTodosTiposArquivo() {
    this.tipoArquivoDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.paginator.page.pipe(tap(() => this.carregarTiposArquivo())).subscribe();
  }

  carregarTiposArquivo(){
    this.tipoArquivoDataSource
    .carregarTiposArquivo( 
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  onClickEditarTipoArquivo(id: number){
    this.abrirArquivoModal(id, 'Editar Tipo Arquivo');
  }

  onDeletarTipoArquivo(id: number){
    console.log(id);
    this._tipoArquivoService
    .deletarTipoArquivo(id)
    .subscribe({
      next: () => {
        this._toastr.success('', 'Tipo Arquivo Deletado');
        this.carregarTiposArquivo();
      },
      error: () => {
        this._toastr.error('', 'Erro ao deletar tipo arquivo');
      }
    })
  }

  abrirArquivoModal(id: number, titulo: string) {
    this._dialog
    .open(TipoArquivoModalComponent, {
      width: 'auto',
      height: 'auto',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        tituloModal: titulo,
        id: id,
      },
    })
    .afterClosed().subscribe(() => {this.carregarTiposArquivo()})
  }

}
