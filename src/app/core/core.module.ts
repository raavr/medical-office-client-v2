import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NotFoundComponent } from './components/not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NotFoundComponent,
  ]
})
export class CoreModule { }
