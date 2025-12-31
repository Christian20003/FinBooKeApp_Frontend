import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';

import { routes } from './app/routing/app-routing.module';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthModule } from './app/auth/auth.module';
import { userReducer } from './app/shared/stores/UserStore/User.reducer';
import { userEffects } from './app/shared/stores/UserStore/User.effects';
import { DashboardModule } from './app/dashboard/dashboard.module';
import { SharedModule } from './app/shared/components/shared.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { config } from './app/transloco-root.module';
import { ToastsComponent } from './app/shared/components/toasts/toasts.component';
import { NavbarComponent } from './app/shared/components/navbar/navbar.component';
import { provideTransloco } from '@jsverse/transloco';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    BrowserModule,
    provideRouter(routes),
    //AppRoutingModule,
    AuthModule,
    DashboardModule,
    SharedModule,
    provideStore({ user: userReducer }),
    provideEffects([userEffects]),
    provideTransloco(config),
    provideHttpClient(withInterceptorsFromDi()),
    // TranslocoRootModule,
    ToastsComponent,
    NavbarComponent,
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
  ],
});
