import { NgModule } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatListModule } from '@angular/material/list';



@NgModule({
  imports:[
    MatIconButton,
    MatIcon,
    OverlayModule,
    MatDivider,
    MatListModule,
    MatIconButton
  ],
  exports:[
    MatIconButton,
    MatIcon,
    OverlayModule,
    MatDivider,
    MatListModule,
    MatIconButton
  ]
})
export class AppMaterialModule { }
