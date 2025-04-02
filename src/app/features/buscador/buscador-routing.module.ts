import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './buscador.component';
import { DetalhesDocumentoComponent } from './components/detalhes-documento/detalhes-documento.component';

const routes: Routes = [
  { path: '',
    component: BuscadorComponent
  },
  {
    path: 'detalhes-documento/:id', // Rota para detalhes do arquivo
    component: DetalhesDocumentoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscadorRoutingModule {}
