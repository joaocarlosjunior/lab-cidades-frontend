import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipoArquivoModalComponent } from './components/tipo-arquivo-modal/tipo-arquivo-modal.component';
import { TipoArquivoTableComponent } from './components/tipo-arquivo-table/tipo-arquivo-table.component';

@Component({
  selector: 'app-tipo-arquivo',
  templateUrl: './tipo-arquivo.component.html',
  styleUrl: './tipo-arquivo.component.scss'
})
export class TipoArquivoComponent {

  constructor(
    private _dialog: MatDialog
  ) {}

  @ViewChild(TipoArquivoTableComponent) tipoArquivoTableComponent!: TipoArquivoTableComponent;

  onClickCadastrarTipoArquivo(){
    this.abrirTipoArquivoModal(0, 'Adicionar Tipo Arquivo', TipoArquivoModalComponent)
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
