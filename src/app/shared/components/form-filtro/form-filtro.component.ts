import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-form-filtro',
  templateUrl: './form-filtro.component.html',
  styleUrl: './form-filtro.component.scss'
})
export class FormFiltroComponent{
  searchForm!: FormGroup;
  private MAX_FILTROS: number = 4;
  isDisabled: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      filtros: this.fb.array([this.createFiltroGroup()]) // Inicia com um filtro
    });
  }

  get filtros(): FormArray<FormGroup> {
    return this.searchForm.get('filtros') as FormArray;
  }

  createFiltroGroup(): FormGroup {
    return this.fb.group({
      filtro: ['all'],        // Tipo de filtro (autor, título, assunto)
      searchTerm: ['']
    });
  }

  createFiltroGroupWithOperator(): FormGroup {
    return this.fb.group({
      filtro: ['all'],        // Tipo de filtro (autor, título, assunto)
      searchTerm: [''],    // Termo de busca
      operador: ['and']       // Operador lógico (e/ou)
    });
  }

  addFiltro(): void {
    this.filtros.push(this.createFiltroGroupWithOperator());
  }

  removeFiltro(index: number): void {
    this.filtros.removeAt(index);
  }

  // Getter para verificar se o botão deve ser desativado
  get isAddFiltroDisabled(): boolean {
    return this.filtros.length >= this.MAX_FILTROS;
  }

  onSubmit(): void {
    console.log(this.searchForm.value);
    // Lógica para submeter o formulário com todos os filtros aplicados
  }
}
