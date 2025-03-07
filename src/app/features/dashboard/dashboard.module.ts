import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ArquivoModule } from './components/arquivo/arquivo.module';
import { CardInfoDashboardComponent } from './components/home-dashboard/components/card-info-dashboard/card-info-dashboard.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { LocalidadeComponent } from './components/localidade/localidade.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TipoArquivoModule } from './components/tipo-arquivo/tipo-arquivo.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LocalidadeModalComponent } from './components/localidade/localidade-modal/localidade-modal.component';



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
    ArquivoModule,
    TipoArquivoModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
