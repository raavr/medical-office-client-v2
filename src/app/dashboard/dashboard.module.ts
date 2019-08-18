import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { DashboardGridComponent } from './containers/dashboard-grid/dashboard-grid.component';
import { DashboardGridItemComponent } from './components/dashboard-grid-item/dashboard-grid-item.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMenuComponent,
    DashboardGridComponent,
    DashboardGridItemComponent
  ],
  imports: [CommonModule, MaterialModule, DashboardRoutingModule]
})
export class DashboardModule {}
