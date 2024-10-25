import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  exports:[
    AdminComponent
  ]
})
export class AdminModule { }
