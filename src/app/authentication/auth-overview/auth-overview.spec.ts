import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { ToastService } from 'src/app/core/services/toast/toast-service';
import {
  getTranslocoModule,
  initialState,
  Loading,
  setUser,
} from 'src/app/shared';
import {
  AuthenticationService,
  PATHS,
  TestLoginDTO,
  TestUser,
} from 'src/app/core/index';
import { AuthOverview } from './auth-overview';
import { Login } from 'src/app/authentication/login/login';
import { Register } from 'src/app/authentication/register/register';
import { RequestAccessCode } from 'src/app/authentication/request-access-code/request-access-code';
import { SetAccessCode } from 'src/app/authentication/set-access-code/set-access-code';
import { routes } from 'src/app/core/routing/routes';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';
import { getComponent } from 'src/app/testing/helper/get-component';
import { NgClass } from '@angular/common';

describe('AuthOverview - Unit Tests', () => {
  let fixture: ComponentFixture<AuthOverview>;
  let router: Router;
  let store: MockStore;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj(AuthenticationService, [
      'postLogin',
      'postRegister',
      'postForgotPwd',
      'postAccessCode',
    ]);
    toastService = jasmine.createSpyObj(ToastService, ['addToast']);

    TestBed.configureTestingModule({
      imports: [
        AuthOverview,
        NgClass,
        getTranslocoModule(),
        MockComponent(Login),
        MockComponent(Register),
        MockComponent(SetAccessCode),
        MockComponent(RequestAccessCode),
        MockComponent(Loading),
      ],
      providers: [
        { provide: AuthenticationService, useValue: authService },
        { provide: ToastService, useValue: toastService },
        provideMockStore({ initialState }),
        provideRouter(routes),
        provideZonelessChangeDetection(),
      ],
    });

    fixture = TestBed.createComponent(AuthOverview);
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    await router.navigateByUrl(PATHS.login);
    fixture.detectChanges();
  });

  it('U-Test-1: Component should navigate to login if login button is clicked', async () => {
    const button = getHTMLElement<HTMLButtonElement>(fixture, '#login')!;
    button.click();
    await fixture.whenStable();

    const login = getComponent(fixture, Login);

    expect(login).toBeTruthy();
    expect(router.url.includes(PATHS.login)).toBeTrue();
  });

  it('U-Test-2: Component should navigate to register if register button is clicked', async () => {
    const button = getHTMLElement<HTMLButtonElement>(fixture, '#register')!;
    button.click();
    await fixture.whenStable();

    const register = getComponent(fixture, Register);

    expect(register).toBeTruthy();
    expect(router.url.includes(PATHS.register)).toBeTrue();
  });

  it('U-Test-3: Component should navigate to forgotPwd if forgotPwd emitter is executed', async () => {
    const button = getHTMLElement<HTMLButtonElement>(fixture, '#login')!;
    button.click();
    await fixture.whenStable();

    const login = getComponent(fixture, Login)!;
    login.forgotPwd.emit();
    await fixture.whenStable();

    const forgotPwd = getComponent(fixture, RequestAccessCode)!;

    expect(forgotPwd).toBeTruthy();
    expect(router.url.includes(PATHS.forgotPwd)).toBeTrue();
  });

  it('U-Test-4: Component should store user object after successful login request', async () => {
    authService.postLogin.and.returnValue(of(TestUser));
    const spy = spyOn(store, 'dispatch');
    const button = getHTMLElement<HTMLButtonElement>(fixture, '#login')!;
    button.click();
    await fixture.whenStable();

    const login = getComponent(fixture, Login)!;
    login.login.emit(TestLoginDTO);
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledWith(setUser({ user: TestUser }));
  });

  it('U-Test-5: Component should navigate to dashboard after successful login request', async () => {
    authService.postLogin.and.returnValue(of(TestUser));
    const button = getHTMLElement<HTMLButtonElement>(fixture, '#login')!;
    button.click();
    await fixture.whenStable();

    const login = getComponent(fixture, Login)!;
    login.login.emit(TestLoginDTO);
    await fixture.whenStable();

    expect(router.url.includes(PATHS.dashboard)).toBeTrue();
  });

  it('U-Test-6: Component should add error toast after failed login request', async () => {
    authService.postLogin.and.returnValue(throwError(() => new Error()));
    const button = getHTMLElement<HTMLButtonElement>(fixture, '#login')!;
    button.click();
    await fixture.whenStable();

    const login = getComponent(fixture, Login)!;
    login.login.emit(TestLoginDTO);
    await fixture.whenStable();

    expect(toastService.addToast).toHaveBeenCalled();
  });

  /**TODO: Register */

  it('U-Test-7: Component should add error toast after failed access code request', async () => {
    authService.postForgotPwd.and.returnValue(throwError(() => new Error()));
    const button = getHTMLElement<HTMLButtonElement>(fixture, '#login')!;
    button.click();
    await fixture.whenStable();

    const login = getComponent(fixture, Login)!;
    login.forgotPwd.emit();
    await fixture.whenStable();

    const forgotPwd = getComponent(fixture, RequestAccessCode)!;
    forgotPwd.send.emit(TestUser.email);
    await fixture.whenStable();

    expect(toastService.addToast).toHaveBeenCalled();
  });

  it('U-Test-8: Component should navigate to login after successful reset password request', async () => {
    authService.postForgotPwd.and.returnValue(of());
    authService.postAccessCode.and.returnValue(of());
    const button = getHTMLElement<HTMLButtonElement>(fixture, '#login')!;
    button.click();
    await fixture.whenStable();

    const login = getComponent(fixture, Login)!;
    login.forgotPwd.emit();
    await fixture.whenStable();

    const forgotPwd = getComponent(fixture, RequestAccessCode)!;
    forgotPwd.send.emit(TestUser.email);
    await fixture.whenStable();

    const accessCode = getComponent(fixture, SetAccessCode)!;
    accessCode.send.emit('123456');
    await fixture.whenStable();

    expect(router.url.includes(PATHS.login)).toBeTrue();
  });

  it('U-Test-9: Component should add error toast after failed reset password request', async () => {
    authService.postForgotPwd.and.returnValue(of());
    authService.postAccessCode.and.returnValue(throwError(() => new Error()));
    const button = getHTMLElement<HTMLButtonElement>(fixture, '#login')!;
    button.click();
    await fixture.whenStable();

    const login = getComponent(fixture, Login)!;
    login.forgotPwd.emit();
    await fixture.whenStable();

    const forgotPwd = getComponent(fixture, RequestAccessCode)!;
    forgotPwd.send.emit(TestUser.email);
    await fixture.whenStable();

    const accessCode = getComponent(fixture, SetAccessCode)!;
    accessCode.send.emit('123456');
    await fixture.whenStable();

    expect(toastService.addToast).toHaveBeenCalled();
  });
});
