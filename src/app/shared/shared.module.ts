import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CoreModule } from '../core/core.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { BuscadorFormComponent } from './components/buscador-form/buscador-form.component';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { CardArquivoComponent } from './components/card-arquivo/card-arquivo.component';
import { NomeAutorPipe } from './components/card-arquivo/pipes/nome-autor.pipe';
import { CardComponent } from './components/card/card.component';
import { FilterComponent } from './components/form-filtro/components/filter/filter.component';
import { FormFiltroComponent } from './components/form-filtro/form-filtro.component';
import { InfoArquivoComponent } from './components/info-arquivo/info-arquivo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchOverlayComponent } from './components/search-overlay/search-overlay.component';
import { ArquivoService } from './services/arquivo.service';
import { CidadeService } from './services/cidade.service';
import { EstadoService } from './services/estado.service';
import { MesorregiaoService } from './services/mesorregiao.service';
import { TipoArquivoService } from './services/tipo-arquivo.service';



@NgModule({
  declarations: [
    CardComponent,
    SearchBarComponent,
    SearchOverlayComponent,
    CardArquivoComponent,
    NomeAutorPipe,
    ButtonPrimaryComponent,
    InfoArquivoComponent,
    FormFiltroComponent,
    FilterComponent,
    BuscadorFormComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    CoreModule,
    HttpClientModule,
    RouterModule,
    DataTablesModule,
  ],
  exports:[
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
    RouterModule,
    CoreModule,
    CardComponent,
    SearchBarComponent,
    CardArquivoComponent,
    ButtonPrimaryComponent,
    FormFiltroComponent,
    BuscadorFormComponent,
    DataTablesModule
  ],
  providers: [ArquivoService, TipoArquivoService, MesorregiaoService, CidadeService, EstadoService]
})
export class SharedModule { }
