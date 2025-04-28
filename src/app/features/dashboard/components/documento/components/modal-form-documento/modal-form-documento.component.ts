import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SimpleCityData } from '../../../../../../core/interfaces/SimpleCityData';
import { Author } from '../../../../../../core/models/Author';
import { City } from '../../../../../../core/models/City';
import { DocumentType } from '../../../../../../core/models/DocumentType';
import { State } from '../../../../../../core/models/State';
import { CityService } from '../../../../../../shared/services/city.service';
import { DocumentTypeService } from '../../../../../../shared/services/document-type.service';
import { DocumentService } from '../../../../../../shared/services/document.service';
import { StateService } from '../../../../../../shared/services/state.service';
import { arquivoValido } from '../../../../../../shared/validators/arquivo-valido.validator';
import { ModalFormLocalidadeComponent } from '../../../localidade/components/modal-form-localidade/modal-form-localidade.component';
import { ModalFormTipoDocumentoComponent } from '../../../tipo-documento/components/modal-form-tipo-documento/modal-form-tipo-documento.component';
import { DownloadFile } from './../../../../../../shared/class/DownloadFile';

class ArquivoNaoSelecionadoMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-modal-form-documento',
  templateUrl: './modal-form-documento.component.html',
  styleUrl: './modal-form-documento.component.scss',
})
export class ModalFormDocumentoComponent implements OnInit {
  documentForm!: FormGroup;
  documentTypesOptions!: DocumentType[];
  cityOptions: SimpleCityData[] = [];
  stateOptions: State[] = [];
  loading: boolean = false;
  filteredCityOptions!: Observable<City[]>;
  addCity: boolean = false;
  file: File | null = null;
  titleForm: string = '';
  errorMessage: string = '';
  filenameRegistred: string = '';
  urlFileRegistred: string = '';
  idDocument!: number;
  downloadFile!: DownloadFile;
  private destroyRef = inject(DestroyRef);
  private idStateSelected!: number;
  private idFileDeleted!: number;

  matcher = new ArquivoNaoSelecionadoMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<ModalFormDocumentoComponent>,
    private _fb: FormBuilder,
    private _documentService: DocumentService,
    private _documentType: DocumentTypeService,
    private _cityService: CityService,
    private _stateService: StateService,
    private _cdr: ChangeDetectorRef,
    private _toastr: ToastrService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.titleForm = this.data.modalTitle;
    this.loadStates();
    this.loadDocumentTypes();

    //data.id 0 é codigo para um novo documento
    if (this.data.id !== 0) {
      this.setModalData(this.data.id);
    }
  }

  private setModalData(id: number) {
    this.loading = true;
    this._documentService
      .getDocumentById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (document) => {
          this.documentForm.patchValue({
            titulo: document.titulo,
            descricao: document.descricao,
            ano_publicacao: document.ano_publicacao,
            arquivo_url: document.arquivo_url,
            tipo_documento: document.tipo_documento.id,
          });

          this.idDocument = id;
          this.filenameRegistred = document.nome_arquivo || '';
          this.urlFileRegistred = document.arquivo_url || '';

          if (!this.filenameRegistred) {
            this.documentForm.setValidators(
              arquivoValido('file', 'arquivo_url')
            );
          }

          // Configura os autores (FormArray)
          const autoresFormArray = this._fb.array([]);
          document.autores.forEach((autor: Author) => {
            autoresFormArray.push(
              this._fb.control(autor.nome_autor, Validators.required)
            );
          });
          this.documentForm.setControl('autores', autoresFormArray);

          // Configura a cidade e estado, se disponíveis
          if (document.cidade) {
            this.addCity = true;
            this.loadStates();
            this.loadCitiesByIdState(document.cidade.estado.id);

            this.documentForm.patchValue({
              estado_id: document.cidade.estado.id,
            });

            this.documentForm.patchValue({
              cidade_id: document.cidade.id,
            });
          }

        },
        error: (error) => {
          this._toastr.error('Tente novamente', 'Erro ao buscar arquivo');
          this.closeModal();
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  private initForm(){
    //verifica se é um novo documento ou é edição(id == 0)
    //se for novo documento, adiciona a validação de documento personalizada
    // para verificar se tem um arquivo ou uma url
    const formValidators =
      this.data.id === 0
        ? { validators: arquivoValido('file', 'arquivo_url') }
        : null;

    this.documentForm = this._fb.group(
      {
        titulo: ['', Validators.required],
        descricao: ['', Validators.required],
        ano_publicacao: [null, [Validators.required, Validators.min(1900)]],
        arquivo_url: [''],
        file: [null],
        autores: this._fb.array([this._fb.control('', Validators.required)]),
        tipo_documento: [null, Validators.required],
        cidade_id: [null],
        estado_id: [null],
      },
      formValidators
    );
  }

  private loadStates() {
    this._stateService
    .list()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (states: State[]) => {
        this.stateOptions = states;
      },
      error: () =>
        this._toastr.error(
          'Por favor recarregue a página!',
          'Erro ao carregar estados'
        ),
    });
  }

  private loadCitiesByIdState(idState: number) {
    this._cityService
    .listCityByIdState(idState)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (cities: SimpleCityData[]) => {
        this.cityOptions = cities;
      },
      error: (err) => {
        switch (err.error.status) {
          case 404:
            this._toastr.info(err.error.detail);
            break;
          default:
            this._toastr.error(
              'Por favor recarregue a página!',
              'Erro ao buscar cidade'
            );
        }
      },
    });
  }

  private loadDocumentTypes() {
    this._documentType
    .listAllDocumentTypes()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (documentTypes: DocumentType[]) => {
        this.documentTypesOptions = documentTypes;
      },
      error: (err) => {
        this._toastr.error(
          'Por favor recarregue a página!',
          'Erro ao carregar tipos documento'
        );
      },
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  closeModal() {
    this._ref.close();
  }

  onSubmit() {
    const formData = this.prepareFormData();

    if (this.data.id === 0) {
      this.createDocument(formData);
    } else {
      this.updateDocument(formData);
    }
  }

  private prepareFormData(): FormData {
    const formData = new FormData();

    // Adiciona arquivo se existir
    if (this.file) {
      formData.append('file', this.file);
    }

    // Garante null se URL vazia
    if (!this.documentForm.get('arquivo_url')?.value) {
      this.documentForm.get('arquivo_url')?.setValue(null);
    }

    // Prepara metadados
    const metadata = this.getMetadata();
    formData.append(
      'metadata',
      new Blob([JSON.stringify(metadata)], {
        type: 'application/json',
      })
    );

    return formData;
  }

  private getMetadata() {
    return {
      titulo: this.documentForm.get('titulo')?.value,
      descricao: this.documentForm.get('descricao')?.value,
      ano_publicacao: this.documentForm.get('ano_publicacao')?.value,
      tipo_documento_id: this.documentForm.get('tipo_documento')?.value,
      autores: this.documentForm.get('autores')?.value,
      cidade_id: this.documentForm.get('cidade_id')?.value,
      arquivo_url: this.documentForm.get('arquivo_url')?.value,
    };
  }

  private createDocument(formData: FormData) {
    this._documentService
    .createDocument(formData)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => this.handleSuccess('Documento adicionado com sucesso'),
      error: (error) => this.handleError(error, 'adicionar'),
    });
  }

  private updateDocument(formData: FormData) {
    if (this.idFileDeleted) {
      this.deleteOldFileBeforeUpdate(formData);
    } else {
      this.performDocumentUpdate(formData);
    }
  }

  private deleteOldFileBeforeUpdate(formData: FormData) {
    this._documentService
      .removeFileByIdDocument(this.idFileDeleted)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.performDocumentUpdate(formData),
        error: () => this._toastr.error('', 'Erro ao deletar arquivo'),
      });
  }

  private performDocumentUpdate(formData: FormData) {
    this._documentService
    .editDocument(formData, this.data.id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => this.handleSuccess('Documento editado com sucesso'),
      error: (error) => this.handleError(error, 'salvar'),
    });
  }

  private handleSuccess(message: string) {
    this._toastr.success('', message);
    this.documentForm.reset();
    this.file = null;
    if (this.data.id !== 0) {
      this.closeModal();
    }
  }

  private handleError(error: any, action: string) {
    if (error?.error?.status === 409) {
      this._toastr.error(error?.error?.detail, `Erro ao ${action} documento`);
      this.errorMessage = error?.error?.detail as string;
      this._cdr.detectChanges();
    } else {
      const message = action === 'salvar' ? 'Tente novamente' : '';
      this._toastr.error(message, `Erro ao ${action} documento`);
    }
  }

  onClickDownloadFile(documentoId: number) {
    this.downloadFile = new DownloadFile(
      this._documentService,
      this._toastr
    );
    this.downloadFile.downloadFile(documentoId);
  }

  get autores(): FormArray {
    return this.documentForm.get('autores') as FormArray;
  }

  addAutor(): void {
    this.autores.push(this._fb.control('', Validators.required));
  }

  addCidade() {
    this.loadStates();

    this.documentForm.addControl('cidade', new FormControl(null));

    this.addCity = true;
  }

  stateSelected(event: MatSelectChange) {
    this.idStateSelected = event.value as number;

    this.cityOptions = [];

    this.loadCitiesByIdState(this.idStateSelected);
  }

  onClickRemoveFileSelected() {
    this.file = null;

    this.documentForm.get('file')?.setValue(null);
    this.documentForm.get('file')?.updateValueAndValidity();
    this.documentForm.get('file')?.markAsTouched();
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onClickRegistredCity() {
    this.openModal(0, 'Cadastrar Cidade', ModalFormLocalidadeComponent);
  }

  onClickRegistredDocumentType() {
    this.openModal(
      0,
      'Cadastrar Tipo Documento',
      ModalFormTipoDocumentoComponent
    );
  }

  private openModal(id: number, titulo: string, component: any) {
    var _popup = this._dialog.open(component, {
      width: 'auto',
      height: 'auto',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        titleModal: titulo,
        id: id,
      },
    });
    _popup.afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => {
      this.loadDocumentTypes();
      this.idStateSelected = this.documentForm.get('estado_id')
        ?.value as number;
      this.loadCitiesByIdState(this.idStateSelected);
    });
  }

  onClickRemoveFileRegistred(id: number) {
    this.idFileDeleted = id;
    this.filenameRegistred = '';
    this.documentForm.get('file')?.setValue(null);
    this.documentForm.setValidators(arquivoValido('file', 'arquivo_url'));
    this.documentForm.get('file')?.updateValueAndValidity();
    this.documentForm.get('file')?.markAsTouched();
  }
}
