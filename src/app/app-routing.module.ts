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
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
