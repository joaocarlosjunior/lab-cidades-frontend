import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BuscadorRoutingModule } from './buscador-routing.module';
import { BuscadorComponent } from './buscador.component';
import { BuscadorFormComponent } from './components/buscador-form/buscador-form.component';
import { CardArquivoComponent } from './components/card-arquivo/card-arquivo.component';
import { NomeAutorPipe } from './components/card-arquivo/pipes/nome-autor.pipe';
import { DetalhesArquivoComponent } from './components/detalhes-arquivo/detalhes-arquivo.component';
import { FilterComponent } from './components/form-filtro/components/filter/filter.component';
import { FormFiltroComponent } from './components/form-filtro/form-filtro.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getPortuguesePaginatorIntl } from '../../shared/functions/getPortuguesePaginatorIntl';

@NgModule({
  declarations: [
    BuscadorComponent,
    BuscadorFormComponent,
    FormFiltroComponent,
    FilterComponent,
    CardArquivoComponent,
    NomeAutorPipe,
    DetalhesArquivoComponent,
  ],
  imports: [SharedModule, BuscadorRoutingModule, MatPaginatorModule],
  exports: [BuscadorComponent],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
  ],
})
export class BuscadorModule {}
