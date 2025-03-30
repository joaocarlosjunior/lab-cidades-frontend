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
import { Observable } from 'rxjs';
import { DadosSimplesCidade } from '../../../../../../core/interfaces/DadosSimplesCidade';
import { Autor } from '../../../../../../core/models/Autor';
import { Cidade } from '../../../../../../core/models/Cidade';
import { Estado } from '../../../../../../core/models/Estado';
import { TipoArquivo } from '../../../../../../core/models/TipoArquivo';
import { DownloadArquivo } from '../../../../../../shared/class/DownloadArquivo';
import { CidadeService } from '../../../../../../shared/services/cidade.service';
import { DocumentoService } from '../../../../../../shared/services/documento.service';
import { EstadoService } from '../../../../../../shared/services/estado.service';
import { TipoArquivoService } from '../../../../../../shared/services/tipo-arquivo.service';
import { arquivoValido } from '../../../../../../shared/validators/arquivo-valido.validator';
import { LocalidadeModalComponent } from '../../../localidade/localidade-modal/localidade-modal.component';
import { TipoArquivoModalComponent } from '../../../tipo-arquivo/components/tipo-arquivo-modal/tipo-arquivo-modal.component';

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
  selector: 'app-modal-arquivo-form',
  templateUrl: './modal-arquivo-form.component.html',
  styleUrl: './modal-arquivo-form.component.scss',
})
export class ModalArquivoFormComponent implements OnInit {
  arquivoForm!: FormGroup;

  tiposArquivoOptions!: TipoArquivo[];
  cidadeOptions: DadosSimplesCidade[] = [];
  estadosOptions: Estado[] = [];

  filteredCidadeOptions!: Observable<Cidade[]>;

  adicionarCidade: boolean = false;
  file: File | null = null;

  tituloForm: string = '';

  errorMessage: string = '';

  nomeArquivoCadastrado: string = '';
  urlArquivoCadastrado: string = '';

  idArquivo!: number;

  downloadArquivo!: DownloadArquivo;

  private idEstadoSelecionado!: number;

  matcher = new ArquivoNaoSelecionadoMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<ModalArquivoFormComponent>,
    private _fb: FormBuilder,
    private _documentoService: DocumentoService,
    private _tipoArquivoService: TipoArquivoService,
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
    this.carregarTipoArquivos();

    //data.id 0 é codigo para um novo arquivo
    if (this.data.id !== 0) {
      this.setModalData(this.data.id);
    }
  }

  setModalData(id: number) {
    this._documentoService.getArquivoByCode(id).subscribe({
      next: (arquivo) => {
        this.arquivoForm.patchValue({
          titulo: arquivo.titulo,
          descricao: arquivo.descricao,
          ano_publicacao: arquivo.ano_publicacao,
          arquivo_url: arquivo.arquivo_url,
          tipo_arquivo: arquivo.tipo_arquivo.id,
        });

        this.idArquivo = id;
        this.nomeArquivoCadastrado = arquivo.nome_arquivo || '';
        this.urlArquivoCadastrado = arquivo.arquivo_url || '';

        if(!this.nomeArquivoCadastrado){
          this.arquivoForm.setValidators(arquivoValido('file', 'arquivo_url'));
        }

        // Configura os autores (FormArray)
        const autoresFormArray = this._fb.array([]);
        arquivo.autores.forEach((autor: Autor) => {
          autoresFormArray.push(
            this._fb.control(autor.nome_autor, Validators.required)
          );
        });
        this.arquivoForm.setControl('autores', autoresFormArray);

        // Configura a cidade e estado, se disponíveis
        if (arquivo.cidade) {
          this.adicionarCidade = true;
          this.carregarEstados();
          this.carregarCidades(arquivo.cidade.estado.id);

          this.arquivoForm.patchValue({
            estado_id: arquivo.cidade.estado.id,
          });

          this.arquivoForm.patchValue({
            cidade_id: arquivo.cidade.id,
          });
        }
      },
      error: (error) => {
        this._toastr.error('', 'Erro ao buscar arquivo');
        this.closeModal();
      },
    });
  }

  inicializarForm() {
    //verifica se é um novo arquivo ou edição
    //se for novo arquivo, adiciona a validação de arquivo
    const formValidators =
      this.data.id === 0
        ? { validators: arquivoValido('file', 'arquivo_url') }
        : null;

    this.arquivoForm = this._fb.group(
      {
        titulo: ['', Validators.required],
        descricao: ['', Validators.required],
        ano_publicacao: [null, [Validators.required, Validators.min(1900)]],
        arquivo_url: [''],
        file: [null],
        autores: this._fb.array([this._fb.control('', Validators.required)]),
        tipo_arquivo: [null, Validators.required],
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
      error: (err) => console.error(err),
    });
  }

  carregarCidades(estadoId: number) {
    this._cidadeService.listaCidadesPeloIdEstado(estadoId).subscribe({
      next: (cidades: DadosSimplesCidade[]) => {
        this.cidadeOptions = cidades;
      },
      error: (err) => {
        switch (err.error.status) {
          case 404:
            this._toastr.info(err.error.detail);
            break;
          default:
            this._toastr.error('Erro ao buscar cidade');
        }
      },
    });
  }

  buscarCidadePeloId(idCidade: number) {}

  carregarTipoArquivos() {
    this._tipoArquivoService.list().subscribe({
      next: (tiposArquivo: TipoArquivo[]) => {
        this.tiposArquivoOptions = tiposArquivo;
      },
      error: (err) => {
        this._toastr.error(
          'Por favor recarregue a página!',
          'Erro ao carregar tipo arquivo'
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
    if (this.arquivoForm.valid) {
      const formData = new FormData();

      if (this.file) {
        formData.append('file', this.file);
      }

      if (!this.arquivoForm.get('arquivo_url')?.value) {
        this.arquivoForm.get('arquivo_url')?.setValue(null);
      }

      const metadata = {
        titulo: this.arquivoForm.get('titulo')?.value,
        descricao: this.arquivoForm.get('descricao')?.value,
        ano_publicacao: this.arquivoForm.get('ano_publicacao')?.value,
        tipo_arquivo_id: this.arquivoForm.get('tipo_arquivo')?.value,
        autores: this.arquivoForm.get('autores')?.value,
        cidade_id: this.arquivoForm.get('cidade_id')?.value,
        arquivo_url: this.arquivoForm.get('arquivo_url')?.value,
      };

      formData.append(
        'metadata',
        new Blob([JSON.stringify(metadata)], {
          type: 'application/json',
        })
      );

      if (this.data.id === 0) {
        this._documentoService.criarArquivo(formData).subscribe({
          next: () => {
            this._toastr.success('', 'Documento salvo com sucesso');
            this.arquivoForm.reset();
            this.file = null;
          },
          error: (error) => {
            switch (error?.error?.status) {
              case 409:
                this._toastr.error(
                  error?.error?.detail,
                  'Erro ao salvar o arquivo'
                );
                this.errorMessage = error?.error?.detail as string;
                this._cdr.detectChanges();
                break;
              default:
                this._toastr.error('', 'Erro ao salvar o arquivo');
            }
          },
        });
      } else {
        this._documentoService.editarArquivo(formData, this.data.id).subscribe({
          next: () => {
            this._toastr.success('', 'Documento editado com sucesso');
            this.arquivoForm.reset();
            this.closeModal();
            this.file = null;
          },
          error: (error) => {
            switch (error?.error?.status) {
              case 409:
                this._toastr.error(
                  error?.error?.detail,
                  'Erro ao editar o arquivo'
                );
                this.errorMessage = error?.error?.detail as string;
                this._cdr.detectChanges();
                break;
              default:
                this._toastr.error('', 'Erro ao editar o arquivo');
            }
          },
        });
      }
    }
  }

  onDownloadArquivo(arquivoId: number) {
    this.downloadArquivo = new DownloadArquivo(
      this._documentoService,
      this._toastr
    );
    this.downloadArquivo.downloadArquivo(arquivoId);
  }

  get autores(): FormArray {
    return this.arquivoForm.get('autores') as FormArray;
  }

  addAutor(): void {
    this.autores.push(this._fb.control('', Validators.required));
  }

  addCidade() {
    this.carregarEstados();

    this.arquivoForm.addControl('cidade', new FormControl(null));

    this.adicionarCidade = true;
  }

  estadoSelecionado(event: MatSelectChange) {
    this.idEstadoSelecionado = event.value;

    this.cidadeOptions = [];

    this.carregarCidades(this.idEstadoSelecionado);
  }

  removerCidade() {
    this.adicionarCidade = false;
    this.arquivoForm.removeControl('cidade');
  }

  onRemoverArquivoSelecionado() {
    this.file = null;

    this.arquivoForm.get('file')?.setValue(null);
    this.arquivoForm.get('file')?.updateValueAndValidity();
    this.arquivoForm.get('file')?.markAsTouched();
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onCadastrarCidade() {
    this.abrirModal(0, 'Cadastrar Cidade', LocalidadeModalComponent);
  }

  onClickCadastrarTipoArquivo() {
    this.abrirModal(0, 'Cadastrar Tipo Arquivo', TipoArquivoModalComponent);
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
      this.carregarTipoArquivos();
      this.carregarCidades(this.idEstadoSelecionado);
    });
  }

  onRemoverArquivoAdicionado(id: number) {
    this._documentoService.removerArquivoPeloIdDocumento(id).subscribe({
      next: () => {
        this.nomeArquivoCadastrado = '';
        this.arquivoForm.get('file')?.setValue(null);
        this.arquivoForm.setValidators(arquivoValido('file', 'arquivo_url'));
        this.arquivoForm.get('file')?.updateValueAndValidity();
        this.arquivoForm.get('file')?.markAsTouched();
        this._toastr.success('', 'Arquivo removido com sucesso');
      },
      error: () => {
        this._toastr.error('', 'Erro ao remover arquivo');
      },
    });

  }
}
