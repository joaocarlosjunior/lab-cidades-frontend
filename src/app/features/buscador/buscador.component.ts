import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Arquivo } from '../../core/models/Arquivo';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent {
  arquivos!: Observable<Arquivo[]>;
  arquivosEncontrado = new BehaviorSubject<Arquivo[]>([]);
  hasArquivos: Observable<boolean> = this.arquivosEncontrado.pipe(
    map((arquivos) => {
      this.searchTriggered = !(arquivos.length > 0);
      return arquivos.length > 0;
    })
  );

  searchTriggered = false;
  textoDigitado!: string;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scroll(0, 0);
      }
    });
  }

  ngOnInit(): void {
    console.log(this.searchTriggered);
  }

  setArquivosEncontrados(arquivos: Arquivo[]) {
    this.arquivosEncontrado.next(arquivos);
  }
}
