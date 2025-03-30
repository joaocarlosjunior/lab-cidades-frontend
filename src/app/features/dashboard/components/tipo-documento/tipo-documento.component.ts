import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormTipoDocumentoComponent } from './components/modal-form-tipo-documento/modal-form-tipo-documento.component';
import { TabelaTipoDocumentoComponent } from './components/tabela-tipo-documento/tabela-tipo-documento.component';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrl: './tipo-documento.component.scss'
})
export class TipoDocumentoComponent {

  constructor(
    private _dialog: MatDialog
  ) {}

  @ViewChild(TabelaTipoDocumentoComponent) tipoArquivoTableComponent!: TabelaTipoDocumentoComponent;

  onClickCadastrarTipoArquivo(){
    this.abrirTipoArquivoModal(0, 'Adicionar Tipo Arquivo', ModalFormTipoDocumentoComponent)
  }

  onClickRecarregarTipoArquivos(){
    this.tipoArquivoTableComponent.carregarTiposDocumento();
  }

  abrirTipoArquivoModal(id: number, titulo: string, component: any) {
    this._dialog.open(component, {
      width: 'auto',
      height: 'auto',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        tituloModal: titulo,
        id: id,
      },
    }).afterClosed().subscribe(() => {
      this.onClickRecarregarTipoArquivos();
    })
  }

}
