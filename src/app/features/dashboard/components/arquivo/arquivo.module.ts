import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPortuguesePaginatorIntl } from '../../../../shared/functions/getPortuguesePaginatorIntl';
import { SharedModule } from '../../../../shared/shared.module';
import { ArquivoComponent } from './arquivo.component';
import { ArquivoTableComponent } from './components/arquivo-table/arquivo-table.component';
import { ModalArquivoFormComponent } from './components/modal-arquivo-form/modal-arquivo-form.component';



@NgModule({
  declarations: [
    ArquivoComponent,
    ArquivoTableComponent,
    ModalArquivoFormComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
  ]
})
export class ArquivoModule { }
