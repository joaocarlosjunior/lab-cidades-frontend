import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormTipoDocumentoComponent } from './components/modal-form-tipo-documento/modal-form-tipo-documento.component';
import { TabelaTipoDocumentoComponent } from './components/tabela-tipo-documento/tabela-tipo-documento.component';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrl: './tipo-documento.component.scss',
})
export class TipoDocumentoComponent {
  private destroyRef = inject(DestroyRef);

  constructor(private _dialog: MatDialog) {}

  @ViewChild(TabelaTipoDocumentoComponent)
  tipoArquivoTableComponent!: TabelaTipoDocumentoComponent;

  onClickRegisterDocumentType() {
    this.openModalDocumentType(
      0,
      'Adicionar Tipo Arquivo',
      ModalFormTipoDocumentoComponent
    );
  }

  onClickReloadDocumentType() {
    this.tipoArquivoTableComponent.loadDocumentTypes();
  }

  private openModalDocumentType(id: number, title: string, component: any) {
    this._dialog
      .open(component, {
        width: 'auto',
        height: 'auto',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          modalTitle: title,
          id: id,
        },
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.onClickReloadDocumentType();
      });
  }
}
