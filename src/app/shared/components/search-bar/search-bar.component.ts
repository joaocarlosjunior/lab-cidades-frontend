import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  setSubjectSearch(inputValue: string) {
    if (inputValue.trim()) {
      if (this.route.snapshot.routeConfig?.path !== 'buscador') {
        this.router.navigate(['/buscador'], { queryParams: { q: inputValue } });
      }
    }
  }
}
