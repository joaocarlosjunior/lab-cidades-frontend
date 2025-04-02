import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { RequestCidadeDTO } from '../../../../../../core/dtos/RequestCidadeDTO';
import { Estado } from '../../../../../../core/models/Estado';
import { Mesorregiao } from '../../../../../../core/models/Mesorregiao';
import { CidadeService } from '../../../../../../shared/services/cidade.service';
import { EstadoService } from '../../../../../../shared/services/estado.service';
import { MesorregiaoService } from '../../../../../../shared/services/mesorregiao.service';
import { Cidade } from '../../../../../../core/models/Cidade';

@Component({
  selector: 'app-modal-form-localidade',
  templateUrl: './modal-form-localidade.component.html',
  styleUrl: './modal-form-localidade.component.scss',
})
export class ModalFormLocalidadeComponent implements OnInit {
  cidadeForm!: FormGroup;
  tituloForm!: string;
  estadosOptions: Estado[] = [];
  mesorregioesOptions: Mesorregiao[] = [];

  errorMessage: string = '';

  carregando: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<ModalFormLocalidadeComponent>,
    private _fb: FormBuilder,
    private _cidadeService: CidadeService,
    private _estadoService: EstadoService,
    private _mesorregiaoService: MesorregiaoService,
    private _toastr: ToastrService
  ) {}

  ngOnInit() {
    this.inicializarForm();
    this.tituloForm = this.data.tituloModal;
    this.carregarEstados();

    //data.id 0 é codigo para um nova localidade
    if (this.data.id !== 0) {
      this.setModalData(this.data.id);
    }
  }

  setModalData(idCidade: number) {
    this.carregando = true;

    this._cidadeService.getCidadePeloId(idCidade).subscribe({
      next: (cidade: Cidade) => {
        this.cidadeForm.patchValue({
          nome_cidade: cidade.nome_cidade,
          estado_id: cidade.estado.id,
          mesorregiao_id: cidade.mesorregiao.id,
        });

        this.buscarMesorregioesPeloIdEstado(cidade.estado.id);
      },
      error: () => {
        this.carregando = false;
        this._toastr.error('', 'Erro ao buscar arquivo');
        this.closeModal();
      },
    });
  }

  inicializarForm() {
    this.cidadeForm = this._fb.group({
      nome_cidade: ['', Validators.required],
      estado_id: [null, Validators.required],
      mesorregiao_id: [null, Validators.required],
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

  carregarMesorregiao() {
    this._mesorregiaoService.list().subscribe({
      next: (mesorregioes: Mesorregiao[]) => {
        this.mesorregioesOptions = mesorregioes;
      },
      error: (err) => console.error(err),
    });
  }

  estadoSelecionado(event: MatSelectChange) {
    const idEstadoSelecionado = event.value as number;
    this.buscarMesorregioesPeloIdEstado(idEstadoSelecionado);
  }

  buscarMesorregioesPeloIdEstado(idEstado: number) {
    this._mesorregiaoService.listarMesorregiaoPeloIdEstado(idEstado).subscribe({
      next: (mesorregioes: Mesorregiao[]) => {
        this.mesorregioesOptions = mesorregioes;
      },
    });
  }

  closeModal() {
    this._ref.close();
  }

  onSubmit() {
    if (this.cidadeForm.valid) {
      const dadosCidade = this.cidadeForm.value as RequestCidadeDTO;

      if (this.data.id === 0) {
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
        });
      } else {
        this._cidadeService.editarCidade(this.data.id, dadosCidade)
        .subscribe({
          next: () => {
            this._toastr.success('', 'Cidade editada com sucesso');
            this.closeModal();
          },
          error: (error) => {
            switch (error?.error?.status) {
              case 409:
                this._toastr.error(
                  error?.error?.detail,
                  'Erro ao editar cidade'
                );
                break;
              default:
                this._toastr.error('', 'Erro ao editar cidade');
            }
          },
        });
      }
    }
  }
}
