import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AlertComponent } from './components/alert/alert.component';
import { AlertFactoryService } from './components/alert/alert-factory.service';
import { DisableControlDirective } from './directives/disable-control.directive';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';
import { FilterRowComponent } from './components/filter-row/filter-row.component';
import { FilterCellComponent } from './components/filter-cell/filter-cell.component';
import { DialogVisitRejectionComponent } from './components/dialog-visit-rejection/dialog-visit-rejection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarImgComponent } from './components/avatar-img/avatar-img.component';

@NgModule({
  declarations: [
    AlertComponent,
    DisableControlDirective,
    DialogConfirmationComponent,
    FilterRowComponent,
    FilterCellComponent,
    DialogVisitRejectionComponent,
    AvatarImgComponent
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  providers: [AlertFactoryService],
  exports: [
    DisableControlDirective,
    FilterRowComponent,
    FilterCellComponent,
    AvatarImgComponent
  ],
  entryComponents: [
    AlertComponent,
    DialogConfirmationComponent,
    DialogVisitRejectionComponent
  ]
})
export class CoreModule {}
