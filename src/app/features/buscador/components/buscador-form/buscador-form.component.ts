import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { ApiResponse } from '../../../../core/interfaces/ApiResponse';
import { Arquivo } from '../../../../core/models/Arquivo';
import { ArquivoService } from '../../../../shared/services/arquivo.service';

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
