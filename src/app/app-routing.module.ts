import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'contato',
    loadChildren: () => import('./features/contato/contato.module').then(m => m.ContatoModule)
  },
  {
    path: 'buscador',
    loadChildren: () => import('./features/buscador/buscador.module').then(m => m.BuscadorModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./features/sobre/sobre.module').then(m => m.SobreModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
