import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { DirtyCheckGuard } from './services/dirty-check.guard';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    canDeactivate: [DirtyCheckGuard]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
