import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterLinkWithHref } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatIcon } from '@angular/material/icon';
import { of, throwError } from 'rxjs';
import { deleteUser, getTranslocoModule } from 'src/app/shared';
import { NavElementComponent } from './nav-element';
import {
  AuthenticationService,
  IconService,
  PATHS,
  ToastService,
} from 'src/app/core';
import { setInputSignal } from 'src/app/testing/helper/set-input-signal';
import { getDebugElement } from 'src/app/testing/helper/get-debug-element';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';
import { routes } from 'src/app/core/routing/routes';
import { MockComponent } from 'ng-mocks';

describe('NavElementComponent - Unit Tests', () => {
  let fixture: ComponentFixture<NavElementComponent>;
  let router: Router;
  let store: MockStore;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let toastService: jasmine.SpyObj<ToastService>;

  const dashbordPath = () => {
    return `/${PATHS.dashboard}`;
  };
  const financesPath = () => {
    return `/${PATHS.finances}`;
  };
  const accountsPath = () => {
    return `/${PATHS.accounts}`;
  };
  const settingsPath = () => {
    return `/${PATHS.settings}`;
  };
  const profilePath = () => {
    return `/${PATHS.profile}`;
  };

  beforeEach(() => {
    const iconService = jasmine.createSpyObj(IconService, ['registerIcons']);
    authService = jasmine.createSpyObj(AuthenticationService, ['postLogout']);
    toastService = jasmine.createSpyObj(ToastService, ['addToast']);

    TestBed.configureTestingModule({
      imports: [
        NavElementComponent,
        MockComponent(MatIcon),
        getTranslocoModule(),
      ],
      providers: [
        provideMockStore(),
        provideZonelessChangeDetection(),
        provideRouter(routes),
        { provide: AuthenticationService, useValue: authService },
        { provide: ToastService, useValue: toastService },
        { provide: IconService, useValue: iconService },
      ],
    });

    fixture = TestBed.createComponent(NavElementComponent);
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
  });

  it('U-Test-1: Component should link to the dashboard route', () => {
    setInputSignal(fixture, 'type', 'dashboard');
    fixture.detectChanges();

    const debugElement = getDebugElement(fixture, 'a');
    const routerLink = debugElement.injector.get(RouterLinkWithHref);

    expect(routerLink['href']).toEqual(dashbordPath());
  });

  it('U-Test-2: Component should link to the finances route', () => {
    setInputSignal(fixture, 'type', 'finances');
    fixture.detectChanges();

    const debugElement = getDebugElement(fixture, 'a');
    const routerLink = debugElement.injector.get(RouterLinkWithHref);

    expect(routerLink['href']).toEqual(financesPath());
  });

  it('U-Test-3: Component should link to the accounts route', () => {
    setInputSignal(fixture, 'type', 'accounts');
    fixture.detectChanges();

    const debugElement = getDebugElement(fixture, 'a');
    const routerLink = debugElement.injector.get(RouterLinkWithHref);

    expect(routerLink['href']).toEqual(accountsPath());
  });

  it('U-Test-4: Component should link to the profile route', () => {
    setInputSignal(fixture, 'type', 'profile');
    fixture.detectChanges();

    const debugElement = getDebugElement(fixture, 'a');
    const routerLink = debugElement.injector.get(RouterLinkWithHref);

    expect(routerLink['href']).toEqual(profilePath());
  });

  it('U-Test-5: Component should link to the settings route', () => {
    setInputSignal(fixture, 'type', 'settings');
    fixture.detectChanges();

    const debugElement = getDebugElement(fixture, 'a');
    const routerLink = debugElement.injector.get(RouterLinkWithHref);

    expect(routerLink['href']).toEqual(settingsPath());
  });

  it('U-Test-6: Component should delete user object from store, after successful logout', async () => {
    spyOn(store, 'dispatch');
    authService.postLogout.and.returnValue(of());
    setInputSignal(fixture, 'type', 'logout');
    fixture.detectChanges();

    const element = getHTMLElement<HTMLAnchorElement>(fixture, 'a')!;
    element.click();
    await fixture.whenStable();

    expect(store.dispatch).toHaveBeenCalledOnceWith(deleteUser());
  });

  it('U-Test-7: Component should navigate to login, after successful logout', async () => {
    authService.postLogout.and.returnValue(of());
    setInputSignal(fixture, 'type', 'logout');
    fixture.detectChanges();

    const element = getHTMLElement<HTMLAnchorElement>(fixture, 'a')!;
    element.click();
    await fixture.whenStable();

    expect(router.url.includes(PATHS.login)).toBeTrue();
  });

  it('U-Test-8: Component should add error to toast service, after failed logout', async () => {
    authService.postLogout.and.returnValue(throwError(() => new Error()));
    setInputSignal(fixture, 'type', 'logout');
    fixture.detectChanges();

    const element = getHTMLElement<HTMLAnchorElement>(fixture, 'a')!;
    element.click();
    await fixture.whenStable();

    expect(toastService.addToast).toHaveBeenCalled();
  });
});
