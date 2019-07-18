import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitsTabComponent } from './containers/visits-tab/visits-tab.component';
import { VisitsComponent } from './containers/visits/visits.component';

const routes: Routes = [
  {
    path: '',
    component: VisitsComponent,
    children: [
      {
        path: '',
        component: VisitsTabComponent,
      },
      {
        path: ':type',
        component: VisitsTabComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitsRoutingModule {}
