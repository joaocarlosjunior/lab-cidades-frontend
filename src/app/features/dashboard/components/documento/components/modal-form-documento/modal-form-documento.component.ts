import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
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
import { delay, Observable } from 'rxjs';
import { DadosSimplesCidade } from '../../../../../../core/interfaces/DadosSimplesCidade';
import { Autor } from '../../../../../../core/models/Autor';
import { Cidade } from '../../../../../../core/models/Cidade';
import { Estado } from '../../../../../../core/models/Estado';
import { TipoDocumento } from '../../../../../../core/models/TipoDocumento';
import { DownloadArquivo } from '../../../../../../shared/class/DownloadArquivo';
import { CidadeService } from '../../../../../../shared/services/cidade.service';
import { DocumentoService } from '../../../../../../shared/services/documento.service';
import { EstadoService } from '../../../../../../shared/services/estado.service';
import { TipoDocumentoService } from '../../../../../../shared/services/tipo-documento.service';
import { arquivoValido } from '../../../../../../shared/validators/arquivo-valido.validator';
import { ModalFormLocalidadeComponent } from '../../../localidade/components/modal-form-localidade/modal-form-localidade.component';
import { ModalFormTipoDocumentoComponent } from '../../../tipo-documento/components/modal-form-tipo-documento/modal-form-tipo-documento.component';

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
  documentoForm!: FormGroup;

  tiposDocumentoOptions!: TipoDocumento[];
  cidadeOptions: DadosSimplesCidade[] = [];
  estadosOptions: Estado[] = [];
  carregando: boolean = false;
  filteredCidadeOptions!: Observable<Cidade[]>;

  adicionarCidade: boolean = false;
  file: File | null = null;

  tituloForm: string = '';

  errorMessage: string = '';

  nomeArquivoCadastrado: string = '';
  urlArquivoCadastrado: string = '';

  idDocumento!: number;

  downloadArquivo!: DownloadArquivo;

  private idEstadoSelecionado!: number;

  private idArquivoDeletado!: number;

  matcher = new ArquivoNaoSelecionadoMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<ModalFormDocumentoComponent>,
    private _fb: FormBuilder,
    private _documentoService: DocumentoService,
    private _tipoDocumentoService: TipoDocumentoService,
    private _cidadeService: CidadeService,
    private _estadoService: EstadoService,
    private _cdr: ChangeDetectorRef,
    private _toastr: ToastrService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inicializarForm();
    this.tituloForm = this.data.tituloModal;
    this.carregarEstados();
    this.carregarTiposDocumento();

    //data.id 0 é codigo para um novo documento
    if (this.data.id !== 0) {
      this.setModalData(this.data.id);
    }
  }

  setModalData(id: number) {
    this.carregando = true;
    this._documentoService.getDocumentoByCode(id).subscribe({
      next: (documento) => {
        this.documentoForm.patchValue({
          titulo: documento.titulo,
          descricao: documento.descricao,
          ano_publicacao: documento.ano_publicacao,
          arquivo_url: documento.arquivo_url,
          tipo_documento: documento.tipo_documento.id,
        });

        this.idDocumento = id;
        this.nomeArquivoCadastrado = documento.nome_arquivo || '';
        this.urlArquivoCadastrado = documento.arquivo_url || '';

        if (!this.nomeArquivoCadastrado) {
          this.documentoForm.setValidators(
            arquivoValido('file', 'arquivo_url')
          );
        }

        // Configura os autores (FormArray)
        const autoresFormArray = this._fb.array([]);
        documento.autores.forEach((autor: Autor) => {
          autoresFormArray.push(
            this._fb.control(autor.nome_autor, Validators.required)
          );
        });
        this.documentoForm.setControl('autores', autoresFormArray);

        // Configura a cidade e estado, se disponíveis
        if (documento.cidade) {
          this.adicionarCidade = true;
          this.carregarEstados();
          this.carregarCidades(documento.cidade.estado.id);

          this.documentoForm.patchValue({
            estado_id: documento.cidade.estado.id,
          });

          this.documentoForm.patchValue({
            cidade_id: documento.cidade.id,
          });
        }
        this.carregando = false;
      },
      error: (error) => {
        this.carregando = false;
        this._toastr.error('', 'Erro ao buscar arquivo');
        this.closeModal();
      },
    });
  }

  inicializarForm() {
    //verifica se é um novo documento ou é edição(id == 0)
    //se for novo documento, adiciona a validação de documento personalizada
    // para verificar se tem um arquivo ou uma url
    const formValidators =
      this.data.id === 0
        ? { validators: arquivoValido('file', 'arquivo_url') }
        : null;

    this.documentoForm = this._fb.group(
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

  carregarEstados() {
    this._estadoService.list().subscribe({
      next: (estados: Estado[]) => {
        this.estadosOptions = estados;
      },
      error: (err) => this._toastr.error('Por favor recarregue a página!','Erro ao carregar estados'),
    });
  }

  carregarCidades(idEstado: number) {
    this._cidadeService.listaCidadesPeloIdEstado(idEstado).subscribe({
      next: (cidades: DadosSimplesCidade[]) => {
        this.cidadeOptions = cidades;
      },
      error: (err) => {
        switch (err.error.status) {
          case 404:
            this._toastr.info(err.error.detail);
            break;
          default:
            this._toastr.error('Por favor recarregue a página!','Erro ao buscar cidade');
        }
      },
    });
  }

  buscarCidadePeloId(idCidade: number) {}

  carregarTiposDocumento() {
    this._tipoDocumentoService.list().subscribe({
      next: (tiposDocumento: TipoDocumento[]) => {
        this.tiposDocumentoOptions = tiposDocumento;
      },
      error: (err) => {
        this._toastr.error(
          'Por favor recarregue a página!',
          'Erro ao carregar tipo documento'
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

  onSubmit(){
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
    if (!this.documentoForm.get('arquivo_url')?.value) {
      this.documentoForm.get('arquivo_url')?.setValue(null);
    }

    // Prepara metadados
    const metadata = this.getMetadata();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], {
      type: 'application/json'
    }));

    return formData;
  }

  private getMetadata() {
    return {
      titulo: this.documentoForm.get('titulo')?.value,
      descricao: this.documentoForm.get('descricao')?.value,
      ano_publicacao: this.documentoForm.get('ano_publicacao')?.value,
      tipo_documento_id: this.documentoForm.get('tipo_documento')?.value,
      autores: this.documentoForm.get('autores')?.value,
      cidade_id: this.documentoForm.get('cidade_id')?.value,
      arquivo_url: this.documentoForm.get('arquivo_url')?.value
    };
  }

  private createDocument(formData: FormData) {
    this._documentoService.criarDocumento(formData).subscribe({
      next: () => this.handleSuccess('Documento adicionado com sucesso'),
      error: (error) => this.handleError(error, 'adicionar')
    });
  }

  private updateDocument(formData: FormData) {
    if (this.idArquivoDeletado) {
      this.deleteOldFileBeforeUpdate(formData);
    } else {
      this.performDocumentUpdate(formData);
    }
  }

  private deleteOldFileBeforeUpdate(formData: FormData) {
    this._documentoService.removerArquivoPeloIdDocumento(this.idArquivoDeletado).subscribe({
      next: () => this.performDocumentUpdate(formData),
      error: () => this._toastr.error('', 'Erro ao editar arquivo')
    });
  }

  private performDocumentUpdate(formData: FormData) {
    this._documentoService.editarDocumento(formData, this.data.id).subscribe({
      next: () => this.handleSuccess('Documento editado com sucesso'),
      error: (error) => this.handleError(error, 'salvar')
    });
  }

  private handleSuccess(message: string) {
    this._toastr.success('', message);
    this.documentoForm.reset();
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

  onDownloadArquivo(documentoId: number) {
    this.downloadArquivo = new DownloadArquivo(
      this._documentoService,
      this._toastr
    );
    this.downloadArquivo.downloadArquivo(documentoId);
  }

  get autores(): FormArray {
    return this.documentoForm.get('autores') as FormArray;
  }

  addAutor(): void {
    this.autores.push(this._fb.control('', Validators.required));
  }

  addCidade() {
    this.carregarEstados();

    this.documentoForm.addControl('cidade', new FormControl(null));

    this.adicionarCidade = true;
  }

  estadoSelecionado(event: MatSelectChange) {
    this.idEstadoSelecionado = event.value;

    this.cidadeOptions = [];

    this.carregarCidades(this.idEstadoSelecionado);
  }

  removerCidade() {
    this.adicionarCidade = false;
    this.documentoForm.removeControl('cidade');
  }

  onRemoverArquivoSelecionado() {
    this.file = null;

    this.documentoForm.get('file')?.setValue(null);
    this.documentoForm.get('file')?.updateValueAndValidity();
    this.documentoForm.get('file')?.markAsTouched();
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onCadastrarCidade() {
    this.abrirModal(0, 'Cadastrar Cidade', ModalFormLocalidadeComponent);
  }

  onClickCadastrarTipoDocumento() {
    this.abrirModal(
      0,
      'Cadastrar Tipo Arquivo',
      ModalFormTipoDocumentoComponent
    );
  }

  abrirModal(id: number, titulo: string, component: any) {
    var _popup = this._dialog.open(component, {
      width: 'auto',
      height: 'auto',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        tituloModal: titulo,
        id: id,
      },
    });
    _popup.afterClosed().subscribe(() => {
      this.carregarTiposDocumento();
      this.idEstadoSelecionado = this.documentoForm.get('estado_id')?.value as number;
      this.carregarCidades(this.idEstadoSelecionado);
    });
  }

  onRemoverArquivoCadastrado(id: number) {
    this.idArquivoDeletado = id;
    this.nomeArquivoCadastrado = '';
    this.documentoForm.get('file')?.setValue(null);
    this.documentoForm.setValidators(arquivoValido('file', 'arquivo_url'));
    this.documentoForm.get('file')?.updateValueAndValidity();
    this.documentoForm.get('file')?.markAsTouched();
  }
}
