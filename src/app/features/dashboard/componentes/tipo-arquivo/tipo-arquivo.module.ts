import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { TipoArquivoModalComponent } from './components/tipo-arquivo-modal/tipo-arquivo-modal.component';
import { TipoArquivoTableComponent } from './components/tipo-arquivo-table/tipo-arquivo-table.component';



@NgModule({
  declarations: [
    TipoArquivoModalComponent,
    TipoArquivoTableComponent
  ],
  imports: [
    SharedModule
  ]
})
export class TipoArquivoModule { }
