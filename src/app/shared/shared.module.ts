import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { CardComponent } from './components/card/card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AutoresPipe } from './pipes/autores.pipe';
import { CityService } from './services/city.service';
import { DashboardService } from './services/dashboard.service';
import { DocumentTypeService } from './services/document-type.service';
import { DocumentService } from './services/document.service';
import { LoginService } from './services/login.service';
import { MesorregiaoService } from './services/mesorregiao.service';
import { StateService } from './services/state.service';



@NgModule({
  declarations: [
    CardComponent,
    SearchBarComponent,
    ButtonPrimaryComponent,
    BackToTopComponent,
    AutoresPipe,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    CoreModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
    RouterModule,
    CoreModule,
    CardComponent,
    SearchBarComponent,
    ButtonPrimaryComponent,
    BackToTopComponent,
    AutoresPipe
  ],
  providers: [ DocumentService, DocumentTypeService, MesorregiaoService, CityService, StateService, DashboardService, LoginService]
})
export class SharedModule { }
