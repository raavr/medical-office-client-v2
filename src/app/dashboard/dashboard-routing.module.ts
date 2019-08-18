import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DoctorGuard } from '../auth/services/doctor.guard';
import { DashboardGridComponent } from './containers/dashboard-grid/dashboard-grid.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardGridComponent,
        pathMatch: 'full'
      },
      {
        path: 'visits',
        loadChildren: '../visits/visits.module#VisitsModule',
      },
      {
        path: 'schedule',
        loadChildren: '../schedule/schedule.module#ScheduleModule',
        canActivateChild: [
          DoctorGuard
        ]
      },
      {
        path: 'patients',
        loadChildren: '../patients/patients.module#PatientsModule',
        canActivateChild: [
          DoctorGuard
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
