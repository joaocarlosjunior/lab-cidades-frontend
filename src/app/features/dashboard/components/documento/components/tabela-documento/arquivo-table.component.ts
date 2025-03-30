import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { take, tap } from 'rxjs';
import { DocumentoService } from '../../../../../../shared/services/documento.service';
import { ModalFormDocumentoComponent } from '../modal-form-documento/modal-form-documento.component';
import { DocumentoDataSource } from '../../datasource/DocumentoDataSource';

@Component({
  selector: 'app-arquivo-table',
  templateUrl: './arquivo-table.component.html',
  styleUrl: './arquivo-table.component.scss',
})
export class ArquivoTableComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'id',
    'titulo',
    'anoPublicacao',
    'cidade',
    'estado',
    'mesorregiao',
    'tipoArquivo',
    'criadoEm',
    'atualizadoEm',
    'acao',
  ];
  documentoDataSource!: DocumentoDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ultimoTitulo: string = '';

  carregando!: boolean;

  constructor(
    private _documentoService: DocumentoService,
    private _dialog: MatDialog,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.documentoDataSource = new DocumentoDataSource(
      this._documentoService,
      this._toastr
    );

    this.documentoDataSource.carregarDocumentos();
    this.documentoDataSource.loading$.subscribe((loading) => {
      this.carregando = loading;
    });
  }

  ngAfterViewInit(): void {
    this.carregarTodosDocumentos();
  }

  carregarTodosDocumentos() {
    this.documentoDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.paginator.page.pipe(tap(() => this.carregarDocumentos())).subscribe();
  }

  buscarDocumentosPorTitulo(event: Event) {
    const input = (event.target as HTMLInputElement).value as string;
    this.ultimoTitulo = input.trim();

    this.paginator.pageIndex = 0;

    this.carregarDocumentos();
  }

  recarregarTabela() {
    this.ultimoTitulo = '';
    this.carregarDocumentos();
  }

  carregarDocumentos() {
    if (this.ultimoTitulo) {
      // Se tiver um título, chama a busca filtrada
      this.documentoDataSource.carregarDocumentosPorTitulo(
        this.ultimoTitulo,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    } else {
      // Caso contrário, carrega todos os Documentos
      this.documentoDataSource.carregarDocumentos(
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    }

    // Atualiza o total de elementos no paginator
    this.documentoDataSource.counter$.subscribe((count) => {
      this.paginator.length = count;
    });
  }

  buscarDocumentoPeloId(event: Event) {
    const input = (event.target as HTMLInputElement).value;
  }

  onClickEditarDocumento(id: number) {
    this.abrirDocumentoModal(id, 'Editar Documento');
  }

  onClickDeletarDocumento(id: number) {
    if (id) {
      this._documentoService
      .deletarDocumento(id)
      .subscribe({
        next: () => {
          this._toastr.success('Documento Deletado com sucesso');

          this.documentoDataSource.counterNumeroDocumentoPorPagina$
            .pipe(take(1))
            .subscribe((count) => {
              if (count - 1 === 0) {
                this.paginator.pageIndex = Math.max(
                  this.paginator.pageIndex - 1,
                  0
                );
                this.carregarDocumentos();
              } else {
                this.carregarDocumentos();
              }
            });
        },
        error: () => this._toastr.error('Erro ao deletar'),
      });
    } else {
      this._toastr.error('Documento inválido');
    }
  }

  abrirDocumentoModal(id: number, titulo: string) {
    this._dialog
      .open(ModalFormDocumentoComponent, {
        width: 'auto',
        height: '80vh',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          tituloModal: titulo,
          id: id,
        },
      })
      .afterClosed()
      .subscribe(() => this.recarregarTabela());
  }
}
