import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/containers/account/account.component';
import { ProfileGuard } from './account/services/profile.guard';
import { AccessTokenGuard } from './auth/services/access-token.guard';
import { NotFoundComponent } from './root/components/not-found/not-found.component';

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
