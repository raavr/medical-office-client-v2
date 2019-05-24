import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NotFoundComponent } from './components/not-found.component';
import { AlertComponent } from './components/alert/alert.component';
import { AlertFactoryService } from './components/alert/alert-factory.service';

@NgModule({
  declarations: [
    NotFoundComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    AlertFactoryService
  ],
  exports: [
    NotFoundComponent,
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class CoreModule { }
