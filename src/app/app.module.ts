import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SobreComponent } from './features/sobre/sobre.component';
import { BuscadorComponent } from './features/buscador/buscador.component';
import { HomeModule } from './features/home/home.module';
import { BuscadorModule } from './features/buscador/buscador.module';
import { ContatoModule } from './features/contato/contato.module';
import { SobreModule } from './features/sobre/sobre.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
