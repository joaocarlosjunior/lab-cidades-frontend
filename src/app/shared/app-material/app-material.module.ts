import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
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
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [
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
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule
  ],
})
export class AppMaterialModule {}
