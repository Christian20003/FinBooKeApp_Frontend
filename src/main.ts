import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userReducer } from './app/shared/stores/UserStore/User.reducer';
import { userEffects } from './app/shared/stores/UserStore/User.effects';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { config } from './app/shared/localization/transloco-config';
import { provideTransloco } from '@jsverse/transloco';
import { provideRouter } from '@angular/router';
import { routes } from './app/core/routing/routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({ user: userReducer }),
    provideEffects([userEffects]),
    provideTransloco(config),
    provideHttpClient(withInterceptorsFromDi()),
    provideZonelessChangeDetection(),
  ],
});
