import { RouterModule, Routes } from "@angular/router";
import { BuscadorComponent } from "./buscador.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: BuscadorComponent },

  ]
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BuscadorRoutingModule { }