import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { SearchOverlayComponent } from './components/search-overlay/search-overlay.component';
import { CardArquivoComponent } from './components/card-arquivo/card-arquivo.component';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ArquivoService } from './services/arquivo.service';
import { NomeAutorPipe } from './components/card-arquivo/pipes/nome-autor.pipe';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { RouterModule } from '@angular/router';
import { InfoArquivoComponent } from './components/info-arquivo/info-arquivo.component';



@NgModule({
  declarations: [
    CardComponent,
    SearchBarComponent,
    SearchOverlayComponent,
    CardArquivoComponent,
    NomeAutorPipe,
    ButtonPrimaryComponent,
    InfoArquivoComponent
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
    CardArquivoComponent,
    ButtonPrimaryComponent,
  ],
  providers: [ArquivoService]
})
export class SharedModule { }
