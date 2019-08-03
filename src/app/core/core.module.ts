import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NotFoundComponent } from './components/not-found.component';
import { AlertComponent } from './components/alert/alert.component';
import { AlertFactoryService } from './components/alert/alert-factory.service';
import { DisableControlDirective } from './directives/disable-control.directive';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';
import { FilterRowComponent } from './components/filter-row/filter-row.component';
import { FilterCellComponent } from './components/filter-cell/filter-cell.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    AlertComponent,
    DisableControlDirective,
    DialogConfirmationComponent,
    FilterRowComponent,
    FilterCellComponent
  ],
  imports: [CommonModule, MaterialModule],
  providers: [AlertFactoryService],
  exports: [
    NotFoundComponent,
    DisableControlDirective,
    FilterRowComponent,
    FilterCellComponent
  ],
  entryComponents: [AlertComponent, DialogConfirmationComponent]
})
export class CoreModule {}
