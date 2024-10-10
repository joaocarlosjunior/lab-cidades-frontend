import { Component, HostListener } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  constructor(private searchService: SearchBarService) {}

  overlayOpen = this.searchService.overlayOpen;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (this.overlayOpen()) {
      this.searchService.overlayOpen.set(false);  // Fecha o overlay ao rolar a página
    }
  }
}
