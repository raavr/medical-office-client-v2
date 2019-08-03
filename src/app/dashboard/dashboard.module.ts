import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';

@NgModule({
  declarations: [DashboardComponent, DashboardMenuComponent],
  imports: [CommonModule, MaterialModule, DashboardRoutingModule]
})
export class DashboardModule {}
