import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileGuard } from './services/profile.guard';
import { AccountComponent } from './containers/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
