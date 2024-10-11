import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoComponent } from './contato.component';



@NgModule({
  declarations: [
    ContatoComponent
  ],
  imports: [
    SharedModule,
    ContatoRoutingModule
  ],
  exports:[
    ContatoComponent
  ]
})
export class ContatoModule { }
