import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DocumentoModule } from './components/documento/documento.module';
import { CardInfoDashboardComponent } from './components/home-dashboard/components/card-info-dashboard/card-info-dashboard.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { LocalidadeComponent } from './components/localidade/localidade.component';
import { LocalidadeModule } from './components/localidade/localidade.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TipoDocumentoModule } from './components/tipo-documento/tipo-documento.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SideBarComponent,
    HomeDashboardComponent,
    CardInfoDashboardComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    DocumentoModule,
    TipoDocumentoModule,
    LocalidadeModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
