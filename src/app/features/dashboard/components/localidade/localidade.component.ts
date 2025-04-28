import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormLocalidadeComponent } from './components/modal-form-localidade/modal-form-localidade.component';
import { TabelaLocalidadeComponent } from './components/tabela-localidade/tabela-localidade.component';

@Component({
  selector: 'app-localidade',
  templateUrl: './localidade.component.html',
  styleUrl: './localidade.component.scss',
})
export class LocalidadeComponent {
  @ViewChild(TabelaLocalidadeComponent)
  tabelaLocalidadeComponent!: TabelaLocalidadeComponent;
  private destroyRef = inject(DestroyRef);

  constructor(private _dialog: MatDialog) {}

  onClickRegisterCity() {
    this.openModalRegisterCity(
      0,
      'Cadastrar Cidade',
      ModalFormLocalidadeComponent
    );
  }

  onClickReloadTable() {
    this.tabelaLocalidadeComponent.reloadTable();
  }

  private openModalRegisterCity(id: number, title: string, component: any) {
    var _popup = this._dialog.open(component, {
      width: 'auto',
      height: 'auto',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        modalTitle: title,
        id: id,
      },
    });
    _popup
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.onClickReloadTable());
  }
}
