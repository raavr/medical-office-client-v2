import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found.component';
import { AccountComponent } from './account/containers/account/account.component';
import { ProfileGuard } from './account/services/profile.guard';
import { AccessTokenGuard } from './auth/services/access-token.guard';

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [
      AccessTokenGuard, 
      ProfileGuard
    ],
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [
      AccessTokenGuard,
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
