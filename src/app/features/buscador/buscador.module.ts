import { NgModule } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getPortuguesePaginatorIntl } from '../../shared/functions/getPortuguesePaginatorIntl';
import { SharedModule } from '../../shared/shared.module';
import { BuscadorRoutingModule } from './buscador-routing.module';
import { BuscadorComponent } from './buscador.component';
import { BuscadorFormComponent } from './components/buscador-form/buscador-form.component';
import { CardDocumentComponent } from './components/card-document/card-document.component';
import { DetalhesDocumentoComponent } from './components/detalhes-documento/detalhes-documento.component';
import { FilterComponent } from './components/form-filtro/components/filter/filter.component';
import { FormFiltroComponent } from './components/form-filtro/form-filtro.component';

@NgModule({
  declarations: [
    BuscadorComponent,
    BuscadorFormComponent,
    FormFiltroComponent,
    FilterComponent,
    CardDocumentComponent,
    DetalhesDocumentoComponent,
  ],
  imports: [SharedModule, BuscadorRoutingModule, MatPaginatorModule],
  exports: [BuscadorComponent],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
  ],
})
export class BuscadorModule {}
