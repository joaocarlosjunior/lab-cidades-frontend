import { Component, OnInit } from '@angular/core';
import { ArquivoService } from '../../shared/services/arquivo.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Arquivo } from '../../core/models/Arquivo';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  arquivos!: Observable<Arquivo[]>;
  searchTriggered = false;
  arquivosEncontrados = false;
  contentHeight = '400px';
  textoDigitado!: string;

  constructor(
    private arquivoService: ArquivoService,
    private route: ActivatedRoute, // ActivatedRoute para capturar query params
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scroll(0, 0);
      }
    });
  }

  ngOnInit(): void {
    // Captura o parâmetro 'q' da URL e realiza a pesquisa
    this.route.queryParams.subscribe((params) => {
      const query = params['q'];
      if (query) {
        this.textoDigitado = query;
        this.setAssunto(query);
      }
    });
  }

  setAssunto(assunto: string) {
    this.searchTriggered = true; 
    this.textoDigitado = assunto;
    this.arquivos = this.arquivoService.buscarAssunto(assunto);

    this.arquivos.subscribe({
      next: (data) => {
        this.arquivosEncontrados = data.length > 0; // Verifica se há arquivos
        this.contentHeight = this.arquivosEncontrados ? 'auto' : '400px';
      },
      error: (err) => {
        this.arquivosEncontrados = false; // Reseta o estado de arquivos encontrados
      },
    });
  }
}
