import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { CardComponent } from './components/card/card.component';
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
    ButtonPrimaryComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    CoreModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
    RouterModule,
    CoreModule,
    CardComponent,
    SearchBarComponent,
    ButtonPrimaryComponent
  ],
  providers: [ArquivoService, TipoArquivoService, MesorregiaoService, CidadeService, EstadoService]
})
export class SharedModule { }
