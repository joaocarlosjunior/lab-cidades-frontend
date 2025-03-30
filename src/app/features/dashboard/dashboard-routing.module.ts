import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "../../core/guards/auth.guard";
import { DocumentoComponent } from "./components/documento/documento.component";
import { HomeDashboardComponent } from "./components/home-dashboard/home-dashboard.component";
import { LocalidadeComponent } from "./components/localidade/localidade.component";
import { TipoDocumentoComponent } from "./components/tipo-documento/tipo-documento.component";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
    { path: '',  component:  DashboardComponent,
      canActivate: [authGuard],
      children: [
        { path: '', component: HomeDashboardComponent },  // Rota padrão quando não há rota filha ativa
        { path: 'documento', component: DocumentoComponent },
        { path: 'tipo-documento', component: TipoDocumentoComponent },
        { path: 'localidade', component: LocalidadeComponent },
      ]
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
