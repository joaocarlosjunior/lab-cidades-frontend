import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SobreComponent } from './features/sobre/sobre.component';
import { BuscadorComponent } from './features/buscador/buscador.component';
import { ContatoComponent } from './features/contato/contato.component';

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
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
