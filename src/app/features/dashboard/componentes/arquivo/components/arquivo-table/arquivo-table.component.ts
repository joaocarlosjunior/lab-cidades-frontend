import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Arquivo } from '../../../../../../core/models/Arquivo';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ArquivoService } from '../../../../../../shared/services/arquivo.service';
import { catchError, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ArquivoDataSource } from '../../datasource/ArquivoDataSource';

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
    'tipoArquivo',
    'acao',
  ];
  arquivoDataSource!: ArquivoDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ultimoTitulo: string = '';

  constructor(
    private _arquivoService: ArquivoService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.arquivoDataSource = new ArquivoDataSource(
      this._arquivoService,
      this._toastr
    );
    this.arquivoDataSource.carregarArquivos();
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
  }

  buscarArquivosPorTitulos(event: Event) {
    const input = (event.target as HTMLInputElement).value as string;
    this.ultimoTitulo = input.trim(); // Armazena o último valor buscado

    if (this.ultimoTitulo) {
      this.paginator.pageIndex = 0; // Resetar paginação para a primeira página
      this.arquivoDataSource.carregarArquivosPorTitulo(
        this.ultimoTitulo,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    } else {
      // Quando o input estiver vazio, recarrega todos os arquivos
      this.paginator.pageIndex = 0;
      this.arquivoDataSource.carregarArquivos();
    }
  }


  carregarArquivosPeloTitulo(titulo: string) {
    this.arquivoDataSource.carregarArquivosPorTitulo(
      titulo,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  buscarArquivosPeloId(event: Event){
    const input = (event.target as HTMLInputElement).value;
    console.log(input)
  }
}
