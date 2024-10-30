import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Arquivo } from '../../../core/models/Arquivo';
import { ArquivoService } from '../../services/arquivo.service';
import { _ErrorStateTracker } from '@angular/material/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-buscador-form',
  templateUrl: './buscador-form.component.html',
  styleUrl: './buscador-form.component.scss'
})
export class BuscadorFormComponent {
  arquivos!: Observable<Arquivo[]>;
  mostrarBuscaAvancada = false;
  @Output() arquivosEncontradosEvent = new EventEmitter<Arquivo[]>();
  
  constructor(
    private arquivoService: ArquivoService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // Captura o parâmetro 'q' da URL e realiza a pesquisa
    this.route.queryParams.subscribe((params) => {
      const query = params['q'];
      if (query) {
        this.setAssunto(query);
      }
    });
  }

  setAssunto(assunto: string) {
    this.arquivos = this.arquivoService.buscarAssunto(assunto);

    this.arquivos.subscribe({
      next: (data) => {
        this.arquivosEncontradosEvent.emit(data);
      },
      error: (err) => {
        this.arquivosEncontradosEvent.emit(err);
      },
    });
  }

  toggleBuscaAvancada() {
    this.mostrarBuscaAvancada = !this.mostrarBuscaAvancada;
  }
}
