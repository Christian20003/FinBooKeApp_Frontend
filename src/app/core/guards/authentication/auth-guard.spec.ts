import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { RouterTestingHarness } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { authGuard } from './auth-guard';
import { IUserUnauthenticated } from 'src/app/core/models';
import { selectSession } from 'src/app/shared';
import { TestSession } from 'src/app/core/index.spec';
import { PATHS } from 'src/app/core/routing/paths';

describe('authGuard - Unit Tests', () => {
  @Component({ template: '<p>App</p>' })
  class AppComponent {}

  @Component({ template: '<p>Login</p>' })
  class LoginComponent {}

  let store: MockStore;
  let router: Router;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [{ selector: selectSession, value: TestSession }],
        }),
        provideRouter([
          { path: 'app', component: AppComponent, canActivate: [authGuard] },
          { path: PATHS.login, component: LoginComponent },
        ]),
        provideZonelessChangeDetection(),
      ],
    });
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    harness = await RouterTestingHarness.create();
  });

  it('U-Test-1: Route guard should navigate to login if user is unauthenticated', async () => {
    store.overrideSelector(selectSession, IUserUnauthenticated.session);

    await harness.navigateByUrl('/app');

    expect(router.url).toBe(`/${PATHS.login}`);
  });

  it('U-Test-2: Route guard should navigate to requested path if user is authenticated', async () => {
    await harness.navigateByUrl('/app');

    expect(router.url).toBe('/app');
  });
});
