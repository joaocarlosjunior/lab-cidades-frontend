import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Arquivo } from '../../../../core/models/Arquivo';
import { ArquivoService } from '../../../../shared/services/arquivo.service';
import { FormArray, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buscador-form',
  templateUrl: './buscador-form.component.html',
  styleUrl: './buscador-form.component.scss',
})
export class BuscadorFormComponent {
  arquivos!: Observable<Arquivo[]>;
  mostrarBuscaAvancada = false;
  @Output() buscaIniciada = new EventEmitter<boolean>();
  @Output() arquivosEncontradoEvent = new EventEmitter<Arquivo[]>();

  constructor(
    private arquivoService: ArquivoService,
    private route: ActivatedRoute,
    private router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Captura o parâmetro 'q' da URL e realiza a pesquisa
    this.route.queryParams.subscribe((params) => {
      const query = params['q'];
      if (query) {
        this.setBusca(query);
      }
    });
  }

  setBusca(assunto: string) {
    this.buscaIniciada.emit(true); // Emite que a busca iniciou

    setTimeout(() => {
      // Simula a chamada HTTP com delay
      this.arquivos = this.arquivoService.buscarAssunto(assunto);

      this.arquivos.pipe(take(1)).subscribe({
        next: (data) => {
          this.arquivosEncontradoEvent.emit(data);
          this._toastr.success('', 'Arquivo encontrado');
        },
        error: (err) => {
          this.arquivosEncontradoEvent.emit([]);
          switch (err.error.status) {
            case 404:
              this._toastr.error('Por favor tente novamente', err.error.detail);
              break;
            case 400:
              this._toastr.error('Por favor tente novamente', err.error.detail);
              break;
            default:
              this._toastr.error(
                'Por favor tente novamente',
                'Erro ao buscar arquivo'
              );
              break;
          }
        },
      });
    }, 3000); // Atraso de 3 segundos para simular o tempo de resposta
  }

  setBuscaAvancada(form: FormGroup) {
    this.buscaIniciada.emit(true);

    const query = this._gerarQuery(form);
    const source = this._getTipoArquivo(form);
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { advanced: query, source: source },
    });

    setTimeout(() => {
      this.arquivoService
        .buscaAvancada(query, source)
        .pipe(take(1))
        .subscribe({
          next: (arquivos) => {
            this.arquivosEncontradoEvent.emit(arquivos);
            this._toastr.success('', 'Arquivo encontrado');
          },
          error: (err) => {
            this.arquivosEncontradoEvent.emit([]);
            console.log(err);
            switch (err.error.status) {
              case 404:
                this._toastr.error(
                  'Por favor tente novamente',
                  err.error.detail
                );
                break;
              case 400:
                this._toastr.error(
                  'Por favor tente novamente',
                  err.error.detail
                );
                break;
              default:
                this._toastr.error(
                  'Por favor tente novamente',
                  'Erro ao buscar arquivo'
                );
                break;
            }
          },
        });
    }, 3000); // Atraso de 3 segundos
  }

  toggleBuscaAvancada() {
    this.mostrarBuscaAvancada = !this.mostrarBuscaAvancada;
  }

  private _gerarQuery(formGroup: FormGroup): string {
    const filtros = formGroup.get('filtros')?.value;

    if (!filtros || filtros.length === 0) {
      return '';
    }

    const operadores: string[] = [];
    const queryParts: string[] = [];
    let currentGroup: string[] = [];

    // Extrair os operadores em um array, começando pelo segundo filtro
    for (let i = 1; i < filtros.length; i++) {
      operadores.push(filtros[i].operador || 'AND');
    }

    // Processar os filtros e criar os grupos
    filtros.forEach((filter: any, index: number) => {
      const { filtro, searchTerm } = filter;
      const filterExpression = `${filtro}:contains(${searchTerm})`;

      if (index === 0) {
        // O primeiro filtro inicia o primeiro grupo
        currentGroup.push(filterExpression);
      } else {
        const operadorAtual = operadores[index - 1];

        if (operadorAtual === 'OR') {
          // Se for OR, mantém no mesmo grupo
          currentGroup.push(filterExpression);
        } else if (operadorAtual === 'AND') {
          // Se for AND, fecha o grupo atual e inicia um novo
          queryParts.push(`(${currentGroup.join(' OR ')})`);
          currentGroup = [filterExpression];
        }
      }
    });

    // Adicionar o último grupo à query
    if (currentGroup.length > 0) {
      queryParts.push(`(${currentGroup.join(' OR ')})`);
    }

    // Unir todos os grupos com AND
    return queryParts.join(' AND ');
  }

  private _getTipoArquivo(form: FormGroup) {
    return form.get('tipoArquivo')?.value;
  }
}
