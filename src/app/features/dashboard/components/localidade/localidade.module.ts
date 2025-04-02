import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPortuguesePaginatorIntl } from '../../../../shared/functions/getPortuguesePaginatorIntl';
import { SharedModule } from './../../../../shared/shared.module';
import { ModalFormLocalidadeComponent } from './components/modal-form-localidade/modal-form-localidade.component';
import { TabelaLocalidadeComponent } from './components/tabela-localidade/tabela-localidade.component';
import { LocalidadeComponent } from './localidade.component';

@NgModule({
  declarations: [
    LocalidadeComponent,
    ModalFormLocalidadeComponent,
    TabelaLocalidadeComponent,
  ],
  imports: [
    SharedModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
  ],
})
export class LocalidadeModule {}
