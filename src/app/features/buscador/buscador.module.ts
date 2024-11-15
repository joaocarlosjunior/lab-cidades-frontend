import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BuscadorRoutingModule } from './buscador-routing.module';
import { BuscadorComponent } from './buscador.component';
import { BuscadorFormComponent } from './components/buscador-form/buscador-form.component';
import { FormFiltroComponent } from './components/form-filtro/form-filtro.component';
import { FilterComponent } from './components/form-filtro/components/filter/filter.component';
import { CardArquivoComponent } from './components/card-arquivo/card-arquivo.component';
import { NomeAutorPipe } from './components/card-arquivo/pipes/nome-autor.pipe';



@NgModule({
  declarations: [
    BuscadorComponent,
    BuscadorFormComponent,
    FormFiltroComponent,
    FilterComponent,
    CardArquivoComponent,
    NomeAutorPipe
  ],
  imports: [
    SharedModule,
    BuscadorRoutingModule
  ],
  exports:[
    BuscadorComponent
  ]
})
export class BuscadorModule { }
