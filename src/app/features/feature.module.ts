import { NgModule } from "@angular/core";
import { SobreComponent } from "./sobre/sobre.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core/core.module";
import { BuscadorComponent } from "./buscador/buscador.component";
import { ContatoComponent } from './contato/contato/contato.component';

@NgModule({
    declarations:[
        HomeComponent,
        SobreComponent,
        BuscadorComponent,
        ContatoComponent
    ],
    imports:[
        CoreModule, SharedModule
    ],
    exports:[
        HomeComponent,
        SobreComponent,
        BuscadorComponent
    ]
})
export class FeatureModule{
    
}