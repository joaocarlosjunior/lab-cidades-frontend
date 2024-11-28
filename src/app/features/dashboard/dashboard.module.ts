import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ArquivoModule } from './componentes/arquivo/arquivo.module';
import { CardInfoDashboardComponent } from './componentes/home-dashboard/components/card-info-dashboard/card-info-dashboard.component';
import { HomeDashboardComponent } from './componentes/home-dashboard/home-dashboard.component';
import { LocalidadeComponent } from './componentes/localidade/localidade.component';
import { SideBarComponent } from './componentes/side-bar/side-bar.component';
import { TipoArquivoModule } from './componentes/tipo-arquivo/tipo-arquivo.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    LocalidadeComponent,
    SideBarComponent,
    HomeDashboardComponent,
    CardInfoDashboardComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    ArquivoModule,
    TipoArquivoModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
