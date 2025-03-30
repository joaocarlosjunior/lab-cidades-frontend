import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { take } from 'rxjs';
import { Documento } from '../../core/models/Documento';
import { DocumentoService } from '../../shared/services/documento.service';
import { BuscadorFormComponent } from './components/buscador-form/buscador-form.component';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent {
  documentosList: Documento[] = [];
  buscaIniciada: boolean = false;
  documentoNaoEncontrado = false;
  queryAtual!: string;
  carregando: boolean = false;
  buscaAvancada: boolean = false;

  formAtual!: FormGroup;
  sourceAtual!: number;
  queryBuscaAvancadaAtual!: string;

  isBuscaAvancada: boolean = false;

  @ViewChild(BuscadorFormComponent)
  buscadorFormComponent!: BuscadorFormComponent;

  length = 0;
  pageSize = 5;
  pageIndex = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _documentoService: DocumentoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd && isPlatformBrowser(this.platformId)) {
        window.scroll(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const query = params['q'];
      if (query) {
        this.setBuscaSimples(query, this.pageIndex, this.pageSize);
      }
    });
  }

  setBuscaSimples(query: string, pageIndex: number, pageSize: number) {
    this.carregando = true;

    if (query !== this.queryAtual) {
      pageIndex = 0;
      pageSize = 5;
    }

    this.queryAtual = query;

    this._documentoService
      .buscarAssunto(query.trim(), pageIndex, pageSize)
      .subscribe({
        next: (data) => {
          this.carregando = false;
          this.documentosList = data.content;
          this.length = data.page.totalElements;
          this.pageSize = data.page.size;
          this.pageIndex = data.page.number;
        },
        error: () => {
          this.carregando = false;
          this.documentoNaoEncontrado = true;
          this.documentosList = [];
          this.length = 0;
        },
      });
  }

  setBuscaAvancada(form: FormGroup, pageIndex: number = 0, pageSize: number = 5) {

    const query = this._gerarQuery(form);
    const source = this._getTipoArquivo(form);

    if((query !== this.queryBuscaAvancadaAtual) && (source !== this.sourceAtual)){
      pageIndex = 0;
      pageSize = 5;
    }
    this.formAtual = form;
    this.queryBuscaAvancadaAtual = query;
    this.sourceAtual = source;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { advanced: query, source: source },
    });

    this._documentoService
      .buscaAvancada(query, source, pageIndex, pageSize)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.carregando = false;
          this.documentosList = data.content;
          this.length = data.page.totalElements;
          this.pageSize = data.page.size;
          this.pageIndex = data.page.number;
        },
        error: () => {
          this.carregando = false;
          this.documentoNaoEncontrado = true;
          this.documentosList = [];
          this.length = 0;
        },
      });
  }

  verificarBuscadaAvancada(event: boolean) {
    this.isBuscaAvancada = event;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setBuscaSimples(this.queryAtual, this.pageIndex, this.pageSize);
  }
  onPageChangeAdvancedSearch(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setBuscaAvancada(this.formAtual, this.pageIndex, this.pageSize);
  }

    private _gerarQuery(formGroup: FormGroup): string {
      const filtros = formGroup.get('filtros')?.value;

      if (!filtros || filtros.length === 0) {
        return '';
      }

      const grupos: string[] = [];
      let grupoAtual: string[] = [];
      let operadorAnterior: string | null = null;

      filtros.forEach((filter: any, index: number) => {
        const { filtro, searchTerm, operador } = filter;
        const filterExpression = `${filtro}:contains(${searchTerm})`;

        if (index === 0) {
          // O primeiro filtro inicia o primeiro grupo
          grupoAtual.push(filterExpression);
        } else if (operador === 'AND') {
          // Filtros com 'AND' permanecem no mesmo grupo
          grupoAtual.push(filterExpression);
        } else if (operador === 'OR') {
          // Se for 'OR', fecha o grupo atual e inicia um novo
          if (grupoAtual.length > 0) {
            grupos.push(`(${grupoAtual.join(' AND ')})`);
          }
          grupoAtual = [filterExpression];
        }

        operadorAnterior = operador;
      });

      // Adicionar o último grupo à query
      if (grupoAtual.length > 0) {
        grupos.push(`(${grupoAtual.join(' AND ')})`);
      }

      // Unir todos os grupos com OR
      return grupos.join(' OR ');
    }

    private _getTipoArquivo(form: FormGroup) {
      return form.get('tipoArquivo')?.value;
    }

}
