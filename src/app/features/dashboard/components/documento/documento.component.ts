import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormDocumentoComponent } from './components/modal-form-documento/modal-form-documento.component';
import { TabelaDocumentoComponent } from './components/tabela-documento/tabela-documento.component';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrl: './documento.component.scss',
})
export class DocumentoComponent {
  @ViewChild(TabelaDocumentoComponent)
  documentTableComponent!: TabelaDocumentoComponent;
  private destroyRef = inject(DestroyRef);

  constructor(private _dialog: MatDialog) {}

  onClickRegistredDocument() {
    this.openModalDocument(
      0,
      'Cadastrar Documento',
      ModalFormDocumentoComponent
    );
  }

  private openModalDocument(id: number, title: string, component: any) {
    var _popup = this._dialog.open(component, {
      width: 'auto',
      height: '80vh',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        modalTitle: title,
        id: id,
      },
    });
    _popup.afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => {
      this.onClickReloadTable();
    });
  }

  onClickReloadTable() {
    this.documentTableComponent.reloadTable();
  }
}
