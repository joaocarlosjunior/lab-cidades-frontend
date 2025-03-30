import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buscador-form',
  templateUrl: './buscador-form.component.html',
  styleUrl: './buscador-form.component.scss',
})
export class BuscadorFormComponent {
  mostrarBuscaAvancada = false;
  @Output() formEvent = new EventEmitter<FormGroup>();
  @Output() isBuscaAvancada = new EventEmitter<boolean>();


  constructor(
  ) {}

  setFormBuscaAvancada(form: FormGroup) {
    this.formEvent.emit(form);
  }

  toggleBuscaAvancada() {
    this.mostrarBuscaAvancada = !this.mostrarBuscaAvancada;
    this.isBuscaAvancada.emit(this.mostrarBuscaAvancada);
  }

}
