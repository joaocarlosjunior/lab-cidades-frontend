import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  overlayOpen = signal(false);
  recentSearches = signal<string[]>(["teste 01","teste 02","teste 03","teste 04"]);

  constructor() {}
}
