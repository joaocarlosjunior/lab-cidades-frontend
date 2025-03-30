import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ModalFormTipoDocumentoComponent } from './components/modal-form-tipo-documento/modal-form-tipo-documento.component';
import { TabelaTipoDocumentoComponent } from './components/tabela-tipo-documento/tabela-tipo-documento.component';
import { TipoDocumentoComponent } from './tipo-documento.component';



@NgModule({
  declarations: [
    TipoDocumentoComponent,
    ModalFormTipoDocumentoComponent,
    TabelaTipoDocumentoComponent
  ],
  imports: [
    SharedModule
  ]
})
export class TipoDocumentoModule { }
