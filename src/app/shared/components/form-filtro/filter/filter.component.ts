import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Filtro } from './interfaces/Filtro';
import { Operador } from './interfaces/Operador';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() group!: FormGroup;
  @Input() exibirOperador = false;
  @Input() exibirBotaoRemover = false;
  @Output() removeFiltro = new EventEmitter<void>();

  filtros: Filtro[] = [
    { value: 'all', viewValue: 'Qualquer Campo' },
    { value: 'autor', viewValue: 'Autor' },
    { value: 'titulo', viewValue: 'Título' },
    { value: 'assunto', viewValue: 'Assunto' },
  ];

  operadores: Operador[] = [
    { value: 'and', viewValue: 'E' },
    { value: 'or', viewValue: 'Ou' }
  ];

}
