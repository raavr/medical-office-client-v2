import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule,
  MatSnackBarModule,
  MatDividerModule,
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatSelectModule,
  MatTabsModule,
  MatDialogModule,
  MatDatepickerModule,
  MatAutocompleteModule
} from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDividerModule,
    MatFormFieldModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatAutocompleteModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDividerModule,
    MatFormFieldModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule {}
