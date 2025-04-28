import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DocumentType } from '../../../../core/models/DocumentType';
import { DocumentTypeService } from '../../../../shared/services/document-type.service';

@Component({
  selector: 'app-form-filtro',
  templateUrl: './form-filtro.component.html',
  styleUrl: './form-filtro.component.scss',
})
export class FormFiltroComponent implements OnInit {
  searchForm!: FormGroup;
  formValid: boolean = false;
  isDisabled: boolean = false;
  @Output() formEvent = new EventEmitter<FormGroup>();
  private MAX_FILTROS: number = 7;
  private destroyRef = inject(DestroyRef)

  documentTypesOptions!: DocumentType[];

  constructor(
    private fb: FormBuilder,
    private _documentTypeService: DocumentTypeService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      documentType: [0, Validators.required],
      filters: this.fb.array([this.createFilterGroup()]), // Inicia com um filtro
    });

    this.listAllDocumentTypes();
  }

  private listAllDocumentTypes(): void {
    this._documentTypeService
    .listAllDocumentTypes()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (documentTypes: DocumentType[]) => {
        this.documentTypesOptions = [
          {
            id: 0,
            nome_tipo_documento: 'Todos os tipos',
            created_at: '',
            updated_at: '',
          },
          ...documentTypes,
        ];
      },
      error: (err) => {
        this._toastr.error('Por favor recarregue a página', 'Erro ao carregar os tipos de documento');
      },
    });
  }

  get filters(): FormArray<FormGroup> {
    return this.searchForm.get('filters') as FormArray;
  }

  private createFilterGroup(): FormGroup {
    return this.fb.group({
      filter: ['all'],
      searchTerm: ['', Validators.required],
    });
  }

  private createFilterGroupWithOperator(): FormGroup {
    return this.fb.group({
      filter: ['all'],
      searchTerm: ['', Validators.required],
      operator: ['AND'],
    });
  }

  addFilter(): void {
    this.filters.push(this.createFilterGroupWithOperator());
  }

  removeFilter(index: number): void {
    this.filters.removeAt(index);
  }

  // Verifica se o botão de adicionar filtro deve ser desativado
  get isAddFilterDisabled(): boolean {
    return this.filters.length >= this.MAX_FILTROS;
  }

  onSubmit(): void {
    this.formEvent.emit(this.searchForm);
  }
}