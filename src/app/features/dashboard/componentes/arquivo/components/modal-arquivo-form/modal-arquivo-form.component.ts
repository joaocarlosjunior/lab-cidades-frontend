import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArquivoService } from '../../../../../../shared/services/arquivo.service';
import { Arquivo } from '../../../../../../core/models/Arquivo';
import { TipoArquivoService } from '../../../../../../shared/services/tipo-arquivo.service';
import { CidadeService } from '../../../../../../shared/services/cidade.service';
import { EstadoService } from '../../../../../../shared/services/estado.service';
import { TipoArquivo } from '../../../../../../core/models/TipoArquivo';
import { Cidade } from '../../../../../../core/models/Cidade';
import { map, Observable, startWith } from 'rxjs';
import { Estado } from '../../../../../../core/models/Estado';
import { cidadeValida } from '../../../../../../shared/validators/cidade-valida.validator';
import { ToastrService } from 'ngx-toastr';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-modal-arquivo-form',
  templateUrl: './modal-arquivo-form.component.html',
  styleUrl: './modal-arquivo-form.component.scss',
})
export class ModalArquivoFormComponent implements OnInit{
  arquivoForm!: FormGroup;

  tiposArquivoOptions!: TipoArquivo[];
  cidadeOptions: Cidade[] = [];
  estadosOptions: Estado[] = [];

  filteredCidadeOptions!: Observable<Cidade[]>;

  adicionarCidade: boolean = false;
  file: File | null = null;

  errorMessage: string = '';

  inputData: any;
  editData!: any;
  closeMessage = 'closed using directive';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<ModalArquivoFormComponent>,
    private _fb: FormBuilder,
    private _arquivoService: ArquivoService,
    private _tipoArquivoService: TipoArquivoService,
    private _cidadeService: CidadeService,
    private _estadoService: EstadoService,
    private _cdr: ChangeDetectorRef,
    private _toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.inicializarForm();
    this.carregarTipoArquivos();

    this.inputData = this.data;
    if (this.inputData > 0) {
      this.setModalData(this.inputData.code);
    }
  }

  setModalData(code: any) {
    this._arquivoService.getArquivoByCode(code).subscribe((item) => {
      this.editData = item;
      this.arquivoForm.setValue({
        titulo: this.editData.titulo,
        descricao: this.editData.descricao,
        ano_publicacao: this.editData.anoPublicacao,
        arquivo_url: this.editData.arquivoUrl,
        autores: this.editData.autores,
        categorias: this.editData.categorias,
        palavras_chave: this.editData.palavrasChave,

      });
    });
  }

  inicializarForm() {
    this.arquivoForm = this._fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      ano_publicacao: [null, [Validators.required, Validators.min(1900)]],
      arquivo_url: [''],
      autores: this._fb.array([this._fb.control('', Validators.required)]),
      tipo_arquivo: [null, Validators.required],
    });
  }

  carregarEstados() {
    this._estadoService.list().subscribe({
      next: (estados: Estado[]) => {
        this.estadosOptions = estados;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }


  carregarCidades(estadoId: number) {
    this._cidadeService.listaCidadesPeloIdEstado(estadoId).subscribe({
      next: (cidades: Cidade[]) => {
        this.cidadeOptions = cidades;
        console.log(cidades);
        this.arquivoForm.controls['cidade'].setValidators([
          cidadeValida(this.cidadeOptions),
        ]);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  carregarTipoArquivos() {
    this._tipoArquivoService.list().subscribe({
      next: (tiposArquivo: TipoArquivo[]) => {
        this.tiposArquivoOptions = tiposArquivo;
      },
      error: (err) => {
        console.error(err);
        this._toastr.error('Por favor recarregue a página!', 'Erro ao carregar tipo arquivo');
      },
    });
  }

  private _filter(value: string | number | Cidade): Cidade[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';

    return this.cidadeOptions.filter((cidade) =>
      cidade.nome_cidade.toLowerCase().includes(filterValue)
    );
  }

  displayCidade(cidade: Cidade): string {
    return cidade ? cidade.nome_cidade : '';
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  closeModal() {
    this._ref.close('Closed using function');
  }

  onSubmit() {
    if (this.arquivoForm.valid) {
      const cidadeSelecionada = this.arquivoForm.get('cidade')?.value;
      const cidadeId = cidadeSelecionada ? cidadeSelecionada.id : null;

      const formData = new FormData();

      if (this.file) {
        formData.append('file', this.file);
      }

      const metadata = {
        titulo: this.arquivoForm.get('titulo')?.value,
        descricao: this.arquivoForm.get('descricao')?.value,
        ano_publicacao: this.arquivoForm.get('ano_publicacao')?.value,
        tipo_arquivo_id: this.arquivoForm.get('tipo_arquivo')?.value,
        autores: this.arquivoForm.get('autores')?.value,
        cidade_id: cidadeId,
        arquivo_url: this.arquivoForm.get('arquivo_url')?.value,
      };

      const arquivoUrl = this.arquivoForm.get('arquivo_url')?.value;

      if (arquivoUrl) {
        metadata.arquivo_url = arquivoUrl;
      }

      formData.append(
        'metadata',
        new Blob([JSON.stringify(metadata)], {
          type: 'application/json',
        })
      );

      this._arquivoService.criarArquivo(formData).subscribe({
        next: () => {
          this._toastr.success('', 'Arquivo salvo com sucesso');
          this.arquivoForm.reset();
          this.file = null;
        },
        error: (error) => {
        
          switch(error?.error?.status){
            case 409:
              this._toastr.error(error?.error?.detail, 'Erro ao salvar o arquivo');
              this.errorMessage = error?.error?.detail as string;
              console.log(this.errorMessage)
              this._cdr.detectChanges();
              break;
            default:
              this._toastr.error('', 'Erro ao salvar o arquivo');
          }
          
        },
      });
    } else {
      console.log(this.arquivoForm.value);
      alert('Erro ao cadastrar arquivo');
    }
  }

  // Métodos auxiliares para obter os arrays do formulário
  get autores(): FormArray {
    return this.arquivoForm.get('autores') as FormArray;
  }

  // Métodos para adicionar novos controles aos arrays
  addAutor(): void {
    this.autores.push(this._fb.control('', Validators.required));
  }

  addCidade() {
    this.carregarEstados();

    this.arquivoForm.addControl('cidade', new FormControl(null));

    this.adicionarCidade = true;
  }

  estadoSelecionado(event: MatSelectChange) {
    const idEstadoSelecionado = event.value;

    this.cidadeOptions = [];

    this.carregarCidades(idEstadoSelecionado);

    this.filteredCidadeOptions = this.arquivoForm.controls[
      'cidade'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  removerCidade() {
    this.adicionarCidade = false;
    this.arquivoForm.removeControl('cidade');
  }

  removerArquivoSelecionado() {
    this.file = null;

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  cancelarCadastroArquivo(){
    alert('Cadastro de arquivo cancelado');
  }
}
