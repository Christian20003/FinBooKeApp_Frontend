import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app/core/routing/routes';
import { translocoConfig, userEffects, userReducer } from './app/shared';
import {
  AuthenticationService,
  authInterceptor,
  DiagramService,
  EnvironmentService,
  LoggingService,
  ToastService,
} from './app/core';

bootstrapApplication(App, {
  providers: [
    AuthenticationService,
    LoggingService,
    EnvironmentService,
    DiagramService,
    ToastService,
    provideRouter(routes, withViewTransitions()),
    provideStore({ user: userReducer }),
    provideEffects([userEffects]),
    provideTransloco(translocoConfig),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZonelessChangeDetection(),
  ],
});
