import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './components/toolbar.component';
import { NavItemComponent } from './components/nav-item.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    ToolbarComponent,
    NavItemComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    RouterModule,
    StoreModule.forFeature('navbar', reducers),
  ],
  exports: [
    ToolbarComponent,
    NavItemComponent,
    MenuComponent
  ]
})
export class NavbarModule { }
