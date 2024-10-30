import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { SearchBarService } from '../../services/search-bar/search-bar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Output() assunto = new EventEmitter<string>();  // Mantemos a emissão do evento

  constructor(
    private searchService: SearchBarService,
    private router: Router,
    private route: ActivatedRoute  // Para verificar a rota atual
  ) {}

  overlayOpen = this.searchService.overlayOpen;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (this.overlayOpen()) {
      this.searchService.overlayOpen.set(false);  // Fecha o overlay ao rolar a página
    }
  }

  setAssunto(inputValue: string) {
    //const inputValue = input.value;

    if (inputValue.trim()) {
      // Emite o termo de busca para o componente pai
      this.assunto.emit(inputValue);

      // Verifica se a rota atual é diferente de '/buscador' antes de redirecionar
      if (this.route.snapshot.routeConfig?.path !== 'buscador') {
        // Redireciona para a página do buscador com o termo de busca como query param
        this.router.navigate(['/buscador'], { queryParams: { q: inputValue } });
      }
    }
  }
}
