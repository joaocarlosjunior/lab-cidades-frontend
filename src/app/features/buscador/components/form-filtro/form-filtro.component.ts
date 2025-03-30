import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Documento } from '../../../../core/models/Documento';
import {
  TipoDocumento
} from '../../../../core/models/TipoDocumento';
import { TipoDocumentoService } from '../../../../shared/services/tipo-documento.service';

@Component({
  selector: 'app-form-filtro',
  templateUrl: './form-filtro.component.html',
  styleUrl: './form-filtro.component.scss',
})
export class FormFiltroComponent implements OnInit {
  searchForm!: FormGroup;
  @Output() arquivosEncontradoEvent = new EventEmitter<Documento[]>();
  @Output() queryEvent = new EventEmitter<string>();
  @Output() formEvent = new EventEmitter<FormGroup>();

  formValid: boolean = false;
  isDisabled: boolean = false;
  private MAX_FILTROS: number = 7;

  tiposDocumentoOptions!: TipoDocumento[];

  constructor(
    private fb: FormBuilder,
    private _tipoDocumentoService: TipoDocumentoService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      tipoDocumento: [0, Validators.required],
      filtros: this.fb.array([this.createFiltroGroup()]), // Inicia com um filtro
    });

    this.carregaTiposDocumento();
  }

  carregaTiposDocumento(): void {
    this._tipoDocumentoService
    .list()
    .subscribe({
      next: (tiposDocumento: TipoDocumento[]) => {
        console.log(tiposDocumento)
        this.tiposDocumentoOptions = [
          {
            id: 0,
            nome_tipo_documento: 'Todos os tipos',
            created_at: '',
            updated_at: '',
          },
          ...tiposDocumento,
        ];
        console.log(this.tiposDocumentoOptions)
      },
      error: (err) => {
        console.error(err);
        this._toastr.error('Por favor recarregue a página', 'Erro ao carregar os tipos de documento');
      },
    });
  }

  get filtros(): FormArray<FormGroup> {
    return this.searchForm.get('filtros') as FormArray;
  }

  createFiltroGroup(): FormGroup {
    return this.fb.group({
      filtro: ['all'],
      searchTerm: ['', Validators.required],
    });
  }

  createFiltroGroupWithOperator(): FormGroup {
    return this.fb.group({
      filtro: ['all'],
      searchTerm: ['', Validators.required],
      operador: ['AND'],
    });
  }

  addFiltro(): void {
    this.filtros.push(this.createFiltroGroupWithOperator());
  }

  removeFiltro(index: number): void {
    this.filtros.removeAt(index);
  }

  // Verifica se o botão de adicionar filtro deve ser desativado
  get isAddFiltroDisabled(): boolean {
    return this.filtros.length >= this.MAX_FILTROS;
  }

  onSubmit(): void {
    this.formEvent.emit(this.searchForm);
  }
}
