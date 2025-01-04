import {
  Component,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Arquivo } from '../../../../core/models/Arquivo';
import { ArquivoTableComponent } from './components/arquivo-table/arquivo-table.component';
import { ModalArquivoFormComponent } from './components/modal-arquivo-form/modal-arquivo-form.component';

@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.component.html',
  styleUrl: './arquivo.component.scss',
})
export class ArquivoComponent {
  arquivoList: Arquivo[] = [];

  @ViewChild(ArquivoTableComponent) arquivoTableComponent!: ArquivoTableComponent;
  
  constructor(
    private _dialog: MatDialog
  ) {}

  onClickAdicionarArquivo() {
    this.abrirArquivoModal(0, 'Adicionar Documento', ModalArquivoFormComponent);
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
