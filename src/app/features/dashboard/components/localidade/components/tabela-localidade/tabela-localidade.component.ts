import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { CidadeService } from '../../../../../../shared/services/cidade.service';
import { LocalidadeDataSource } from '../../datasource/LocalidadeDataSource';
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
  localidadeDataSource!: LocalidadeDataSource;

  carregando: boolean = true;

  termoBuscaAtual: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private destroy$ = new Subject<void>();

  constructor(
    private _cidadeService: CidadeService,
    private _dialog: MatDialog,
    private _toastr: ToastrService,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.inicializarFonteDados();
    this.configurarSubscricoes();
  }

  ngAfterViewInit(): void {
    this.configurarPaginator();
    this.carregarDadosIniciais();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private inicializarFonteDados(): void {
    this.localidadeDataSource = new LocalidadeDataSource(
      this._cidadeService,
      this._toastr
    );
  }

  private configurarSubscricoes(): void {
    this.localidadeDataSource.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((carregando) => {
        this.carregando = carregando;
        this._cdRef.detectChanges();
      });

    this.localidadeDataSource.counter$
      .pipe(takeUntil(this.destroy$))
      .subscribe((total) => {
        if(this.paginator){
          this.paginator.length = total;
        }
      });
  }

  private configurarPaginator(): void {
    this.paginator.page
      .pipe(
        tap(() => this.carregarLocalidades()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private carregarDadosIniciais(): void {
    this.carregarLocalidades();
  }

  carregarLocalidades(): void {
    if (this.termoBuscaAtual) {
      this.carregarLocalidadesFiltradas();
    } else {
      this.carregarTodasLocalidades();
    }
  }

  private carregarLocalidadesFiltradas(): void {
    this.localidadeDataSource.carregarLocalidadesPeloNomeCidade(
      this.termoBuscaAtual,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  private carregarTodasLocalidades(): void {
    this.localidadeDataSource.carregarLocalidades(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  recarregarTabela(): void {
    this.termoBuscaAtual = '';
    this.carregarLocalidades();
  }

  buscarPorNome(event: Event): void {
    const elemento = event.target as HTMLInputElement;
    this.termoBuscaAtual = elemento.value.trim();
    this.carregarLocalidades();
  }

  onClickEditarLocalidade(id: number): void {
    this.abrirModalLocalidade(id, 'Editar Localidade');
  }

  onClickDeletarLocalidade(id: number): void {
    if (id) {
      this._cidadeService.deletarCidade(id).subscribe({
        next: () => {
          this._toastr.success('Localidade removida com sucesso');
          this.verificarPaginaAposExclusao();
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

  private verificarPaginaAposExclusao(): void {
    this.localidadeDataSource.counterNumeroLocalidadePorPagina$
      .pipe(take(1))
      .subscribe((total) => {
        if (total - 1 === 0) {
          this.paginator.pageIndex = Math.max(this.paginator.pageIndex - 1, 0);
        }
        this.carregarLocalidades();
      });
  }

  abrirModalLocalidade(id: number, titulo: string): void {
    this._dialog
      .open(ModalFormLocalidadeComponent, {
        width: 'auto',
        height: 'auto',
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

  adicionarNovaLocalidade(): void {
    this.abrirModalLocalidade(0, 'Nova Localidade');
  }
}
