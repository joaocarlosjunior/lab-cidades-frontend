import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Arquivo } from '../../../core/models/Arquivo';
import { ArquivoService } from '../../services/arquivo.service';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buscador-form',
  templateUrl: './buscador-form.component.html',
  styleUrl: './buscador-form.component.scss'
})
export class BuscadorFormComponent {
  arquivos!: Observable<Arquivo[]>;
  mostrarBuscaAvancada = false;
  @Output() buscaIniciada = new EventEmitter<boolean>();
  @Output() arquivosEncontradoEvent = new EventEmitter<Arquivo[]>();
  
  
  constructor(
    private arquivoService: ArquivoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

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
        },
        error: (err) => {
          this.arquivosEncontradoEvent.emit(err);
        },
      });
    }, 3000); // Atraso de 3 segundos para simular o tempo de resposta
  }

  setBuscaAvancada(form: FormGroup) {
    this.buscaIniciada.emit(true);

    const query = this._gerarQuery(form)
    const source = this._getTipoArquivo(form);

  
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query, source: source}
    });

    setTimeout(() => {
      this.arquivoService.buscaAvancada(query, source).pipe(take(1)).subscribe({
        next: (arquivos) => {
          this.arquivosEncontradoEvent.emit(arquivos);
        },
        error: (error) => {
          this.arquivosEncontradoEvent.emit(error);
        },
      });
    }, 3000); // Atraso de 3 segundos
  }

  toggleBuscaAvancada() {
    this.mostrarBuscaAvancada = !this.mostrarBuscaAvancada;
  }

  private _gerarQuery(form:FormGroup): string {
    const filtros = form.get('filtros')?.value;

    return filtros
      .map((filtro: any, index: number) => {
        const condition = `${filtro.filtro}:contains(${filtro.searchTerm})`;
        const operador = index > 0 ? ` ${filtro.operador} ` : '';
        return `${operador}${condition}`;
      })
      .join('');
  }

  private _getTipoArquivo(form: FormGroup){
    return form.get('tipoArquivo')?.value;
  }
}
