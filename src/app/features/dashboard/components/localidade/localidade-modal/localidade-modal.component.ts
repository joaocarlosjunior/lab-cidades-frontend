import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CidadeService } from '../../../../../shared/services/cidade.service';
import { EstadoService } from '../../../../../shared/services/estado.service';
import { Estado } from '../../../../../core/models/Estado';
import { MesorregiaoService } from '../../../../../shared/services/mesorregiao.service';
import { Mesorregiao } from '../../../../../core/models/Mesorregiao';
import { MatSelectChange } from '@angular/material/select';
import { Cidade } from '../../../../../core/models/Cidade';
import { RequestCidadeDTO } from '../../../../../core/dtos/RequestCidadeDTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-localidade-modal',
  templateUrl: './localidade-modal.component.html',
  styleUrl: './localidade-modal.component.scss',
})
export class LocalidadeModalComponent implements OnInit {
  cidadeForm!: FormGroup;
  tituloForm!: string;
  estadosOptions: Estado[] = [];
  mesorregioesOptions: Mesorregiao[] = [];

  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<LocalidadeModalComponent>,
    private _fb: FormBuilder,
    private _cidadeService: CidadeService,
    private _estadoService: EstadoService,
    private _mesorregiaoService: MesorregiaoService,
        private _toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.inicializarForm();
    this.tituloForm = this.data.tituloModal;
    this.carregarEstados();
  }

  inicializarForm() {
    this.cidadeForm = this._fb.group({
      nome_cidade: ['', Validators.required],
      estado_id: [null, Validators.required],
      mesorregiao_id: [null, Validators.required]
    });
  }

  carregarEstados() {
    this._estadoService.list().subscribe({
      next: (estados: Estado[]) => {
        this.estadosOptions = estados;
      },
      error: (err) => console.error(err),
    });
  }

  carregarMesorregiao(){
    this._mesorregiaoService.list().subscribe({
      next: (mesorregioes: Mesorregiao[]) => {
        this.mesorregioesOptions = mesorregioes;
      },
      error: (err) => console.error(err),
    });
  }

  estadoSelecionado(event: MatSelectChange){
    const idEstadoSelecionado = event.value;

    this._mesorregiaoService.listarMesorregiaoPeloIdEstado(idEstadoSelecionado).subscribe({
      next: (mesorregioes: Mesorregiao[]) => {
        this.mesorregioesOptions = mesorregioes;
      }
    })
  }

  closeModal() {
    this._ref.close();
  }

  onSubmit(){
    const dadosCidade = this.cidadeForm.value as RequestCidadeDTO;

    this._cidadeService.cadastrarCidade(dadosCidade).subscribe({
      next: () => {
        this._toastr.success('', 'Cidade cadastrada com sucesso');
        this.cidadeForm.reset();
      },
      error: (error) => {
        switch (error?.error?.status) {
          case 409:
            this._toastr.error(
              error?.error?.detail,
              'Erro ao cadastrar cidade'
            );
            break;
          default:
            this._toastr.error('', 'Erro ao cadastrar cidade');
        }
      },
    })
  }

}
