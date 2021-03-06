import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './material/material.module';
import { NavbarModule } from './navbar/navbar.module';
import { reducers, metaReducers } from './core/reducers';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenService } from './auth/services/token.service';
import { jwtOptionsFactory } from './auth/services/jwt-options.factory';
import { AuthModule } from './auth/auth.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { HomeModule } from './home/home.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from './account/account.module';
import { MomentDateModule } from './material/moment-date.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MaterialPaginatorIntlModule } from './material/material-paginator-intl.module';
import { FooterComponent } from './root/components/footer/footer.component';
import { SidenavContainerComponent } from './root/components/sidenav-container/sidenav-container.component';
import { SignMenuComponent } from './root/components/sign-menu/sign-menu.component';
import { NotFoundComponent } from './root/components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidenavContainerComponent,
    SignMenuComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService]
      }
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    EffectsModule.forRoot([AppEffects]),
    MaterialModule,
    CoreModule,
    AuthModule,
    NotificationsModule,
    HomeModule,
    NavbarModule,
    AccountModule,
    MomentDateModule.forRoot(),
    MaterialPaginatorIntlModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
