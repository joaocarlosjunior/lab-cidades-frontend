import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Arquivo } from '../../core/models/Arquivo';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent {
  arquivosList: Arquivo[] = [];
  buscaIniciada: boolean = false;
  arquivoNaoEncontrado = false;
  textoDigitado!: string;
  carregando: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scroll(0, 0);
      }
    });
  }

  onBuscaIniciada(buscaIniciada: boolean) {
    this.carregando = buscaIniciada; // Inicia o estado de carregamento
  }

  onArquivosEncontrado(arquivos: Arquivo[]) {
    this.carregando = false; // Conclui o carregamento

    if(arquivos.length > 0){
      this.arquivosList = arquivos
    }else{
      this.arquivoNaoEncontrado = true;
      this.arquivosList = [];
    }
    
  }
}
