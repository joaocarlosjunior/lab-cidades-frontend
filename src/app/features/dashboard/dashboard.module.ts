import { Documento } from './../../core/models/Documento';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CardInfoDashboardComponent } from './components/home-dashboard/components/card-info-dashboard/card-info-dashboard.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { LocalidadeModalComponent } from './components/localidade/localidade-modal/localidade-modal.component';
import { LocalidadeComponent } from './components/localidade/localidade.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TipoDocumentoModule } from './components/tipo-documento/tipo-documento.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DocumentoModule } from './components/documento/documento.module';



@NgModule({
  declarations: [
    DashboardComponent,
    LocalidadeComponent,
    SideBarComponent,
    HomeDashboardComponent,
    CardInfoDashboardComponent,
    LocalidadeModalComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    DocumentoModule,
    TipoDocumentoModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
