import { Component } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';

@Component({
  selector: 'app-search-overlay',
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.scss'
})
export class SearchOverlayComponent {
  constructor(private searchBarServuce: SearchBarService){}

  recentSearches = this.searchBarServuce.recentSearches;
}
