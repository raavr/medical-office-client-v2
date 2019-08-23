import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './containers/home/home.component';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [HomeComponent, WelcomeComponent],
  imports: [CommonModule, CoreModule, MaterialModule, HomeRoutingModule]
})
export class HomeModule {}
