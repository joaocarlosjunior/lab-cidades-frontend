import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPortuguesePaginatorIntl } from '../../../../shared/functions/getPortuguesePaginatorIntl';
import { SharedModule } from '../../../../shared/shared.module';
import { ModalDetalharDocumentoComponent } from './components/modal-detalhar-documento/modal-detalhar-documento.component';
import { ModalFormDocumentoComponent } from './components/modal-form-documento/modal-form-documento.component';
import { ArquivoTableComponent } from './components/tabela-documento/arquivo-table.component';
import { DocumentoComponent } from './documento.component';



@NgModule({
  declarations: [
    DocumentoComponent,
    ArquivoTableComponent,
    ModalFormDocumentoComponent,
    ModalDetalharDocumentoComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
  ]
})
export class DocumentoModule { }
