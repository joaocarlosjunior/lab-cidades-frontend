import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { ArquivoService } from '../../../../../../shared/services/arquivo.service';
import { ArquivoDataSource } from '../../datasource/ArquivoDataSource';
import { ModalArquivoFormComponent } from '../modal-arquivo-form/modal-arquivo-form.component';

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
  arquivoDataSource!: ArquivoDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ultimoTitulo: string = '';

  carregando!: boolean;

  constructor(
    private _arquivoService: ArquivoService,
    private _dialog: MatDialog,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.arquivoDataSource = new ArquivoDataSource(
      this._arquivoService,
      this._toastr
    );

    this.arquivoDataSource.carregarArquivos();
    this.arquivoDataSource.loading$.subscribe((loading) => {
      this.carregando = loading;
    });
  }

  ngAfterViewInit(): void {
    this.carregarTodosArquivos();
  }

  carregarTodosArquivos() {
    this.arquivoDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.paginator.page.pipe(tap(() => this.carregarArquivos())).subscribe();
  }

  buscarArquivosPorTitulos(event: Event) {
    const input = (event.target as HTMLInputElement).value as string;
    this.ultimoTitulo = input.trim();

    this.paginator.pageIndex = 0;

    this.carregarArquivos();
  }

  recarregarTabela() {
    this.ultimoTitulo = '';
    this.carregarArquivos();
  }

  carregarArquivos() {
    if (this.ultimoTitulo) {
      // Se tiver um título, chama a busca filtrada
      this.arquivoDataSource.carregarArquivosPorTitulo(
        this.ultimoTitulo,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    } else {
      // Caso contrário, carrega todos os arquivos
      this.arquivoDataSource.carregarArquivos(
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    }

    // Verifica se a tabela está vazia e reseta o paginator
    this.arquivoDataSource.counter$.subscribe((count) => {
      if (count === 0) {
        this.paginator.pageIndex = 0; // Reseta o paginator para a primeira página
      }
    });
  }

  buscarArquivosPeloId(event: Event) {
    const input = (event.target as HTMLInputElement).value;
  }

  onClickEditarArquivo(id: number) {
    this.abrirArquivoModal(id, 'Editar Documento');
  }

  onClickDeletarArquivo(id: number) {
    if (id) {
      this._arquivoService.deletarArquivo(id).subscribe({
        next: () => {
          this._toastr.success('Deletado com sucesso');
          this.arquivoDataSource.carregarArquivos(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        },
        error: () => this._toastr.error('Erro ao deletar'),
      });
    } else {
      this._toastr.error('Documento inválido');
    }
  }

  abrirArquivoModal(id: number, titulo: string) {
    this._dialog
      .open(ModalArquivoFormComponent, {
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
