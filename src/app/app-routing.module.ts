import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SobreComponent } from './features/sobre/sobre.component';
import { BuscadorComponent } from './features/buscador/buscador.component';
import { ContatoComponent } from './features/contato/contato/contato.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'sobre', component: SobreComponent },
  { path: 'buscador', component: BuscadorComponent },
  { path: 'contato', component: ContatoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
