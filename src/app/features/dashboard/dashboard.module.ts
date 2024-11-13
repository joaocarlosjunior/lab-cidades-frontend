import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ArquivoComponent } from './componentes/arquivo/arquivo.component';
import { ArquivoTableComponent } from './componentes/arquivo/components/arquivo-table/arquivo-table.component';
import { ModalArquivoFormComponent } from './componentes/arquivo/components/modal-arquivo-form/modal-arquivo-form.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { HomeDashboardComponent } from './componentes/home-dashboard/home-dashboard.component';
import { LocalidadeComponent } from './componentes/localidade/localidade.component';
import { SideBarComponent } from './componentes/side-bar/side-bar.component';
import { TipoArquivoComponent } from './componentes/tipo-arquivo/tipo-arquivo.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ArquivoComponent,
    CategoriaComponent,
    LocalidadeComponent,
    SideBarComponent,
    HomeDashboardComponent,
    ModalArquivoFormComponent,
    TipoArquivoComponent,
    ArquivoTableComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
