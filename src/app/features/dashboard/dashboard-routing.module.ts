import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArquivoComponent } from "./componentes/arquivo/arquivo.component";
import { HomeDashboardComponent } from "./componentes/home-dashboard/home-dashboard.component";
import { LocalidadeComponent } from "./componentes/localidade/localidade.component";
import { TipoArquivoComponent } from "./componentes/tipo-arquivo/tipo-arquivo.component";
import { DashboardComponent } from "./dashboard.component";
import { authGuard } from "../../core/guards/auth.guard";

const routes: Routes = [
    { path: '',  component:  DashboardComponent,
      canActivate: [authGuard],
      children: [
        { path: '', component: HomeDashboardComponent },  // Rota padrão quando não há rota filha ativa
        { path: 'documento', component: ArquivoComponent },
        { path: 'tipo-documento', component: TipoArquivoComponent },
        { path: 'localidade', component: LocalidadeComponent },
      ]
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }