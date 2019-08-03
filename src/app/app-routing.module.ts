import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found.component';
import { AuthGuard } from './auth/services/auth.guard';
import { AccountComponent } from './account/containers/account/account.component';
import { ProfileGuard } from './account/services/profile.guard';
import { DoctorGuard } from './auth/services/doctor.guard';

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [
      AuthGuard,
      ProfileGuard
    ],
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [
      AuthGuard
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
