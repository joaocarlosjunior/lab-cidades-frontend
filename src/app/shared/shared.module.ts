import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { SearchOverlayComponent } from './components/search-overlay/search-overlay.component';
import { CardArquivoComponent } from './components/card-arquivo/card-arquivo.component';



@NgModule({
  declarations: [
    CardComponent,
    SearchBarComponent,
    SearchOverlayComponent,
    CardArquivoComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports:[
    CommonModule,
    CardComponent,
    SearchBarComponent,
    CardArquivoComponent
  ]
})
export class SharedModule { }
