import { AfterViewInit, Component, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TipoArquivoService } from '../../../../../../shared/services/tipo-arquivo.service';
import { TipoArquivoTableComponent } from '../tipo-arquivo-table/tipo-arquivo-table.component';

@Component({
  selector: 'app-tipo-arquivo-modal',
  templateUrl: './tipo-arquivo-modal.component.html',
  styleUrl: './tipo-arquivo-modal.component.scss',
})
export class TipoArquivoModalComponent implements OnInit{
  tipoArquivoForm = new FormControl('', Validators.required);

  @ViewChild(TipoArquivoTableComponent) tipoArquivoTableComponent!: TipoArquivoTableComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<TipoArquivoModalComponent>,
    private _tipoArquivoService: TipoArquivoService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if(this.data.id !== 0){
      this.setModalData(this.data.id)
    }
  }

  setModalData(id: number){
    this._tipoArquivoService.buscarTipoArquivoPeloId(id).subscribe({
      next: (tipoArquivo) => {
        this.tipoArquivoForm.setValue(tipoArquivo.nome_tipo_arquivo);
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
    let nomeTipoArquivo = this.tipoArquivoForm.value as string;

    if(this.data.id === 0){
      this._tipoArquivoService.criarTipoArquivo(nomeTipoArquivo).subscribe({
        next: () => {
          this._toastr.success('', 'Tipo Documento salvo com sucesso');
          this.tipoArquivoForm.reset();
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
      this._tipoArquivoService.editarTipoArquivo(this.data.id, nomeTipoArquivo).subscribe({
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
}
