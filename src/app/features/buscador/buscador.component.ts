import { Component } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss'
})
export class BuscadorComponent {
  numbers: number[] = Array.from({ length: 5 }, (_, i) => i + 1);
}
