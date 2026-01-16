import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { provideRouter } from '@angular/router';
import { routes } from './app/core/routing/routes';
import { translocoConfig, userEffects, userReducer } from './app/shared';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideStore({ user: userReducer }),
    provideEffects([userEffects]),
    provideTransloco(translocoConfig),
    provideHttpClient(withInterceptorsFromDi()),
    provideZonelessChangeDetection(),
  ],
});
