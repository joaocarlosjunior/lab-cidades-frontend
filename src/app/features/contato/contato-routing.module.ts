import { NgModule } from "@angular/core";
import { ContatoComponent } from "./contato.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: '', component: ContatoComponent },

  ]
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ContatoRoutingModule { }