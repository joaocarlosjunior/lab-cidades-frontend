import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { DocumentoService } from '../../../../../../shared/services/documento.service';
import { ModalFormDocumentoComponent } from '../modal-form-documento/modal-form-documento.component';
import { DocumentoDataSource } from '../../datasource/DocumentoDataSource';
import { ModalDetalharDocumentoComponent } from '../modal-detalhar-documento/modal-detalhar-documento.component';

@Component({
  selector: 'app-tabela-documento',
  templateUrl: './tabela-documento.component.html',
  styleUrl: './tabela-documento.component.scss',
})
export class TabelaDocumentoComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'id',
    'titulo',
    'anoPublicacao',
    'cidade',
    'estado',
    'mesorregiao',
    'tipoDocumento',
    'criadoEm',
    'atualizadoEm',
    'acao',
  ];
  documentoDataSource!: DocumentoDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  termoBusca: string = '';

  carregando: boolean = true;

  private destroy$ = new Subject<void>();

  constructor(
    private _documentoService: DocumentoService,
    private _dialog: MatDialog,
    private _toastr: ToastrService,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.inicializarDataSource();
    this.configurarSubscricoes();
  }

  ngAfterViewInit(): void {
    this.configurarPaginacao();
    this.carregarDocumentos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private inicializarDataSource(): void {
    this.documentoDataSource = new DocumentoDataSource(
      this._documentoService,
      this._toastr
    );
  }

  private configurarSubscricoes(): void {
    this.documentoDataSource.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((carregando) => {
        this.carregando = carregando;
        this._cdRef.detectChanges();
      });

    this.documentoDataSource.counter$
      .pipe(
        takeUntil(this.destroy$),
        tap((total) => {
          if (this.paginator) {
            this.paginator.length = total;
          }
        })
      )
      .subscribe();
  }

  private configurarPaginacao(): void {
    this.paginator.page
      .pipe(
        tap(() => this.carregarDocumentos()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  buscarDocumentosPorTitulo(event: Event): void {
    this.termoBusca = (event.target as HTMLInputElement).value.trim();
    this.paginator.pageIndex = 0;
    this.carregarDocumentos();
  }

  recarregarTabela(): void {
    this.termoBusca = '';
    this.carregarDocumentos();
  }

  carregarDocumentos(): void {
    if (!this.paginator) return;

    if (this.termoBusca) {
      this.documentoDataSource.carregarDocumentosPorTitulo(
        this.termoBusca,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    } else {
      this.documentoDataSource.carregarDocumentos(
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    }
  }

  onClickEditarDocumento(id: number): void {
    this.abrirModalDocumento(id, 'Editar Documento');
  }

  onClickVisualizarDocumento(idDocumento: number): void {
    this._dialog.open(ModalDetalharDocumentoComponent, {
      width: '80vh',
      height: 'auto',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { id: idDocumento },
    });
  }

  onClickDeletarDocumento(id: number): void {
    if (!id) {
      this._toastr.error('Documento inválido');
      return;
    }

    this._documentoService.deletarDocumento(id).subscribe({
      next: () => {
        this._toastr.success('Documento removido com sucesso');
        this.ajustarPaginacaoAposExclusao();
      },
      error: () => this._toastr.error('Erro ao remover documento'),
    });
  }

  private ajustarPaginacaoAposExclusao(): void {
    this.documentoDataSource.counterNumeroDocumentoPorPagina$
      .pipe(take(1))
      .subscribe((total) => {
        if (total - 1 === 0) {
          this.paginator.pageIndex = Math.max(this.paginator.pageIndex - 1, 0);
        }
        this.carregarDocumentos();
      });
  }

  abrirModalDocumento(id: number, titulo: string): void {
    this._dialog
      .open(ModalFormDocumentoComponent, {
        width: 'auto',
        height: '80vh',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: { tituloModal: titulo, id },
      })
      .afterClosed()
      .subscribe(() => this.recarregarTabela());
  }
}
