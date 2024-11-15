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
  @Input({ required: true }) group!: FormGroup;
  @Input({ required: true }) exibirOperador: boolean = false;
  @Input({ required: true }) exibirBotaoRemover: boolean = false;
  @Input({ required: true }) formValid: boolean = false;
  @Output() removeFiltro = new EventEmitter<void>();

  filtros: Filtro[] = [
    { value: 'all', viewValue: 'Qualquer Campo' },
    { value: 'autor', viewValue: 'Autor' },
    { value: 'titulo', viewValue: 'Título' },
    { value: 'assunto', viewValue: 'Assunto' },
    { value: 'mesorregiao', viewValue: 'Mesorregiao' },
    { value: 'cidade', viewValue: 'Cidade' },
    { value: 'estado', viewValue: 'Estado' }
  ];

  operadores: Operador[] = [
    { value: 'AND', viewValue: 'E' },
    { value: 'OR', viewValue: 'Ou' }
  ];

}
