import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SobreComponent } from './sobre.component';
import { SobreRoutingModule } from './sobre-routing.module';



@NgModule({
  declarations: [
    SobreComponent
  ],
  imports: [
    SharedModule,
    SobreRoutingModule
  ],
  exports:[
    SobreComponent
  ]
})
export class SobreModule { }
