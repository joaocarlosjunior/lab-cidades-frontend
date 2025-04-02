import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { TipoDocumentoService } from '../../../../../../shared/services/tipo-documento.service';
import { TabelaTipoDocumentoComponent } from '../tabela-tipo-documento/tabela-tipo-documento.component';

@Component({
  selector: 'app-modal-form-tipo-documento',
  templateUrl: './modal-form-tipo-documento.component.html',
  styleUrl: './modal-form-tipo-documento.component.scss',
})
export class ModalFormTipoDocumentoComponent implements OnInit, OnDestroy{
  tipoDocumentoForm = new FormControl('', Validators.required);

  @ViewChild(TabelaTipoDocumentoComponent) tipoArquivoTableComponent!: TabelaTipoDocumentoComponent;

  private destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<ModalFormTipoDocumentoComponent>,
    private _tipoDocumentoService: TipoDocumentoService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if(this.data.id !== 0){
      this.setModalData(this.data.id)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setModalData(id: number){
    this._tipoDocumentoService.buscarTipoDocumentoPeloId(id).subscribe({
      next: (tipoArquivo) => {
        this.tipoDocumentoForm.setValue(tipoArquivo.nome_tipo_documento);
      },
      error: (error) => {
        this._toastr.error('', 'Erro ao buscar Tipo Arquivo');
        this.closeModal();
      }
    })
  }

  closeModal(){
    this._ref.close();
  }

  onSubmit() {
    let nomeTipoDocumento = this.tipoDocumentoForm.value as string;

    if(this.data.id === 0){
      this._tipoDocumentoService.criarTipoDocumento(nomeTipoDocumento).subscribe({
        next: () => {
          this._toastr.success('', 'Tipo Documento salvo com sucesso');
          this.tipoDocumentoForm.reset();
        },
        error: (error) => {
          switch(error?.error?.status){
            case 409:
              this._toastr.error(
                error?.error?.detail,
                'Erro ao salvar o tipo documento'
              );
              break;
            default:
              this._toastr.error('', 'Erro ao salvar tipo documento');
          }
        }
      });
    }else{
      this._tipoDocumentoService.editarTipoDocumento(this.data.id, nomeTipoDocumento).subscribe({
        next: () => {
          this._toastr.success('', 'Tipo Documento editado com sucesso');
          this.closeModal();
        },
        error: (error) => {
          switch(error?.error?.status){
            case 409:
              this._toastr.error(
                error?.error?.detail,
                'Erro ao salvar o tipo documento'
              );
              break;
            default:
              this._toastr.error('', 'Erro ao editar tipo documento');
          }
        }
      });
    }
  }

  private tratarErro(error: any): void {

    if (error?.error?.status === 409) {
      this._toastr.error(error.error.detail, 'Conflito ao salvar');
      return;
    }

    const mensagem = this.data.id === 0
      ? 'Erro ao criar tipo de documento'
      : 'Erro ao atualizar tipo de documento';

    this._toastr.error(mensagem);
  }
}
