import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  imports:[
    MatIconButton,
    MatIcon,
    OverlayModule,
    MatDivider,
    MatListModule,
    MatIconButton,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    
  ],
  exports:[
    MatIconButton,
    MatIcon,
    OverlayModule,
    MatDivider,
    MatListModule,
    MatIconButton,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class AppMaterialModule { }
