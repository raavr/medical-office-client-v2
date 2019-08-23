import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { AccessTokenGuard } from '../auth/services/access-token.guard';

const routes: Routes = [{
  path: '', component: HomeComponent, canActivate: [ AccessTokenGuard ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
