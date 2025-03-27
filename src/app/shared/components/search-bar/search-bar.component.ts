import { Component, EventEmitter, HostListener, Output, Inject, PLATFORM_ID } from '@angular/core';
import { SearchBarService } from '../../services/search-bar/search-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() assunto = new EventEmitter<string>();

  constructor(
    private searchService: SearchBarService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  overlayOpen = this.searchService.overlayOpen;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      if (this.overlayOpen()) {
        this.searchService.overlayOpen.set(false);
      }
    }
  }

  setAssunto(inputValue: string) {
    if (inputValue.trim()) {
      this.searchService.overlayOpen.set(false);

      if (this.route.snapshot.routeConfig?.path !== 'buscador') {
        this.router.navigate(['/buscador'], { queryParams: { q: inputValue } });
      }
    }
  }
}
