import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormDocumentoComponent } from '../documento/components/modal-form-documento/modal-form-documento.component';
import { TabelaLocalidadeComponent } from './components/tabela-localidade/tabela-localidade.component';
import { ModalFormLocalidadeComponent } from './components/modal-form-localidade/modal-form-localidade.component';

@Component({
  selector: 'app-localidade',
  templateUrl: './localidade.component.html',
  styleUrl: './localidade.component.scss',
})
export class LocalidadeComponent {

    @ViewChild(TabelaLocalidadeComponent) tabelaLocalidadeComponent!: TabelaLocalidadeComponent;


  constructor(private _dialog: MatDialog) {}

  onClickCadastrarCidade() {
    this.abrirArquivoModal(
      0,
      'Cadastrar Documento',
      ModalFormLocalidadeComponent
    );
  }

  onClickRecarregarTabela() {
    this.tabelaLocalidadeComponent.recarregarTabela();
  }

  abrirArquivoModal(id: number, titulo: string, component: any) {
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
    _popup.afterClosed().subscribe((item) => {
      this.onClickRecarregarTabela();
    });
  }
}
