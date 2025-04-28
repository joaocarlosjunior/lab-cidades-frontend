import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Filter } from './interfaces/Filter';
import { Operator } from './interfaces/Operator';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input({ required: true }) group!: FormGroup;
  @Input({ required: true }) showOperator: boolean = false;
  @Input({ required: true }) showRemoveButton: boolean = false;
  @Input({ required: true }) formValid: boolean = false;
  @Output() removeFilter = new EventEmitter<void>();

  filters: Filter[] = [
    { value: 'all', viewValue: 'Qualquer Campo' },
    { value: 'autor', viewValue: 'Autor' },
    { value: 'titulo', viewValue: 'Título' },
    { value: 'assunto', viewValue: 'Assunto' },
    { value: 'mesorregiao', viewValue: 'Mesorregiao' },
    { value: 'cidade', viewValue: 'Cidade' },
    { value: 'estado', viewValue: 'Estado' }
  ];

  operators: Operator[] = [
    { value: 'AND', viewValue: 'E' },
    { value: 'OR', viewValue: 'Ou' }
  ];

}
