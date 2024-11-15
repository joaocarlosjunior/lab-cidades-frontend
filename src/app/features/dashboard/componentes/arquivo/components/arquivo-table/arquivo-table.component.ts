import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { ArquivoService } from '../../../../../../shared/services/arquivo.service';
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

  carregando!:boolean;

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
    this.arquivoDataSource.loading$.subscribe((loading) =>{
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
  }

  buscarArquivosPeloId(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    console.log(input);
  }
}
