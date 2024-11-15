import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TipoArquivoDataSource } from '../../datasource/TipoArquivoDataSource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TipoArquivoService } from '../../../../../../shared/services/tipo-arquivo.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

@Component({
  selector: 'app-tipo-arquivo-table',
  templateUrl: './tipo-arquivo-table.component.html',
  styleUrl: './tipo-arquivo-table.component.scss'
})
export class TipoArquivoTableComponent implements OnInit, AfterViewInit{
  displayedColumns = [
    'id',
    'tipoArquivo',
    'acao',
  ];

  tipoArquivoDataSource!: TipoArquivoDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _tipoArquivoService: TipoArquivoService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tipoArquivoDataSource = new TipoArquivoDataSource(
      this._tipoArquivoService,
      this._toastr
    );
    this.tipoArquivoDataSource.carregarTiposArquivo();
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





}
