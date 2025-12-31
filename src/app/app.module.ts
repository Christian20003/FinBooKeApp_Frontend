import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthModule } from './auth/auth.module';
import { userReducer } from './shared/stores/UserStore/User.reducer';
import { userEffects } from './shared/stores/UserStore/User.effects';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/components/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { ToastsComponent } from './shared/components/toasts/toasts.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

/* @NgModule({
  imports: [
    AppComponent,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    SharedModule,
    StoreModule.forRoot({ user: userReducer }, {}),
    EffectsModule.forRoot([userEffects]),
    HttpClientModule,
    TranslocoRootModule,
    ToastsComponent,
    NavbarComponent,
  ],
  providers: [provideAnimationsAsync(), provideZonelessChangeDetection()],
})
export class AppModule {} */
bootstrapApplication(AppComponent, {
  providers: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    SharedModule,
    provideStore({ user: userReducer }),
    provideEffects([userEffects]),
    HttpClientModule,
    TranslocoRootModule,
    ToastsComponent,
    NavbarComponent,
    provideZonelessChangeDetection(),
  ],
});
