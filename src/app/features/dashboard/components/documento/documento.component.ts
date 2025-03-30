import {
  Component,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Documento } from '../../../../core/models/Documento';
import { ModalFormDocumentoComponent } from './components/modal-form-documento/modal-form-documento.component';
import { ArquivoTableComponent } from './components/tabela-documento/arquivo-table.component';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrl: './documento.component.scss',
})
export class DocumentoComponent {
  documentoList: Documento[] = [];

  @ViewChild(ArquivoTableComponent) arquivoTableComponent!: ArquivoTableComponent;

  constructor(
    private _dialog: MatDialog
  ) {}

  onClickAdicionarArquivo() {
    this.abrirArquivoModal(0, 'Cadastrar Documento', ModalFormDocumentoComponent);
  }

  abrirArquivoModal(id: number, titulo: string, component: any) {
    var _popup = this._dialog.open(component, {
      width: 'auto',
      height: '80vh',
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

  onClickRecarregarTabela(){
    this.arquivoTableComponent.recarregarTabela();
  }
}
