import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BuscadorRoutingModule } from './buscador-routing.module';
import { BuscadorComponent } from './buscador.component';



@NgModule({
  declarations: [
    BuscadorComponent
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
