import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { SearchBarService } from '../../services/search-bar/search-bar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  constructor(private searchService: SearchBarService) {}

  @Output() assunto = new EventEmitter<string>();

  overlayOpen = this.searchService.overlayOpen;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (this.overlayOpen()) {
      this.searchService.overlayOpen.set(false);  // Fecha o overlay ao rolar a página
    }
  }

  setAssunto(event: Event){
    const inputValue = (event.target as HTMLInputElement).value;
    this.assunto.emit(inputValue);
    if (this.overlayOpen()) {
      this.searchService.overlayOpen.set(false);  // Fecha o overlay ao rolar a página
    }
  }
}
