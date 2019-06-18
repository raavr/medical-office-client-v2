import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitsComponent } from './containers/visits/visits.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'visits'
  },
  {
    path: 'visits',
    component: VisitsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitsRoutingModule {}
