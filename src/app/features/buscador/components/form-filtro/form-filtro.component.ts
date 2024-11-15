import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Arquivo } from '../../../../core/models/Arquivo';
import { TipoArquivo } from '../../../../core/models/TipoArquivo';
import { TipoArquivoService } from '../../../../shared/services/tipo-arquivo.service';

@Component({
  selector: 'app-form-filtro',
  templateUrl: './form-filtro.component.html',
  styleUrl: './form-filtro.component.scss',
})
export class FormFiltroComponent implements OnInit{
  searchForm!: FormGroup;
  @Output() arquivosEncontradoEvent = new EventEmitter<Arquivo[]>();
  @Output() queryEvent = new EventEmitter<string>();
  @Output() formEvent = new EventEmitter<FormGroup>();

  formValid: boolean = false;
  isDisabled: boolean = false;
  private MAX_FILTROS: number = 7;

  tipoArquivoOptions!: TipoArquivo[];

  constructor(
    private fb: FormBuilder,
    private tipoArquivoService: TipoArquivoService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      tipoArquivo: [0, Validators.required],
      filtros: this.fb.array([this.createFiltroGroup()]), // Inicia com um filtro
    });

    this.carregaTipoArquivos();
  }

  carregaTipoArquivos(): void {
    this.tipoArquivoService.list().subscribe({
      next: (tiposArquivo: TipoArquivo[]) => {
        this.tipoArquivoOptions = [{ id: 0, nome_tipo_arquivo: 'Todos os tipos' }, ...tiposArquivo];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  get filtros(): FormArray<FormGroup> {
    return this.searchForm.get('filtros') as FormArray;
  }

  createFiltroGroup(): FormGroup {
    return this.fb.group({
      filtro: ['all'],
      searchTerm: ['', Validators.required]
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
    //const query = this.generateQuery();
    this.formEvent.emit(this.searchForm);
    //this.filtros.valid ? this.queryEvent.emit(query) : (this.formValid = false);
  }

  private generateQuery(): string {
    const filtros = this.filtros.value;

    return filtros
      .map((filtro, index) => {
        const condition = `${filtro.filtro}:contains(${filtro.searchTerm})`;
        const operador = index > 0 ? ` ${filtros[index].operador} ` : '';
        return `${operador}${condition}`;
      })
      .join('');
  }
}
