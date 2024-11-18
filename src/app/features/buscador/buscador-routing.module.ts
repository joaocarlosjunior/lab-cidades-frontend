import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './buscador.component';
import { NgModule } from '@angular/core';
import { DetalhesArquivoComponent } from './components/detalhes-arquivo/detalhes-arquivo.component';

const routes: Routes = [
  { path: '', 
    component: BuscadorComponent
  },
  {
    path: 'detalhes-arquivo/:id', // Rota para detalhes do arquivo
    component: DetalhesArquivoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscadorRoutingModule {}
