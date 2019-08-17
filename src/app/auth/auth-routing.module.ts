import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { SignupComponent } from './containers/signup/signup.component';
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component';
import { PasswordTokenGuard } from './services/password-token.guard';
import { NewPasswordComponent } from './containers/new-password/new-password.component';
import { AccessTokenGuard } from './services/access-token.guard';
import { UnprotectedRoutePaths } from './auth.routes';

const routes: Routes = [
  {
    path: UnprotectedRoutePaths.LOGIN,
    component: LoginComponent,
    canActivate: [AccessTokenGuard]
  },
  {
    path: UnprotectedRoutePaths.SIGNUP,
    component: SignupComponent,
    canActivate: [AccessTokenGuard]
  },
  {
    path: UnprotectedRoutePaths.RESET,
    component: ResetPasswordComponent,
    canActivate: [AccessTokenGuard]
  },
  {
    path: `${UnprotectedRoutePaths.RESET}/:token`,
    component: NewPasswordComponent,
    canActivate: [AccessTokenGuard, PasswordTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
