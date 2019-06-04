import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found.component';
import { AuthGuard } from './auth/services/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule',
    canActivate: [
      AuthGuard
    ],
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
