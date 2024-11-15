import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ArquivoModule } from './componentes/arquivo/arquivo.module';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { HomeDashboardComponent } from './componentes/home-dashboard/home-dashboard.component';
import { LocalidadeComponent } from './componentes/localidade/localidade.component';
import { SideBarComponent } from './componentes/side-bar/side-bar.component';
import { TipoArquivoModule } from './componentes/tipo-arquivo/tipo-arquivo.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CategoriaComponent,
    LocalidadeComponent,
    SideBarComponent,
    HomeDashboardComponent,
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
