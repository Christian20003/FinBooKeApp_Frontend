import { provideZonelessChangeDetection } from '@angular/core';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore, Store } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import {
  FormInputError,
  getTranslocoModule,
  Loading,
  selectUser,
  userEffects,
  userReducer,
} from 'src/app/shared';
import { AuthOverview } from 'src/app/authentication/auth-overview/auth-overview';
import {
  API_PATHS,
  AuthenticationService,
  EnvironmentService,
  IconService,
  PATHS,
  TestRegisterDTO,
  TestUser,
  ToastService,
} from 'src/app/core';
import { Login } from 'src/app/authentication/login/login';
import { Register } from 'src/app/authentication/register/register';
import { SetAccessCode } from 'src/app/authentication/set-access-code/set-access-code';
import { RequestAccessCode } from 'src/app/authentication/request-access-code/request-access-code';
import { routes } from 'src/app/core/routing/routes';
import {
  getHTMLElement,
  getHTMLElements,
} from 'src/app/testing/helper/get-html-element';
import { setInputValues } from 'src/app/testing/helper/set-input-values';

describe('AuthOverview', () => {
  let fixture: ComponentFixture<AuthOverview>;
  let router: Router;
  let store: Store;
  let controller: HttpTestingController;

  const API = 'http://localhost';

  const loginPath = function (): string {
    return API + API_PATHS.auth.login;
  };
  const registerPath = function (): string {
    return API + API_PATHS.auth.register;
  };
  const forgotPwdPath = function (): string {
    return API + API_PATHS.auth.forgotPwd;
  };
  const resetPwdPath = function (): string {
    return API + API_PATHS.auth.resetPwd;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AuthOverview,
        Login,
        Register,
        SetAccessCode,
        RequestAccessCode,
        Loading,
        FormInputError,
        ReactiveFormsModule,
        MatIconModule,
        getTranslocoModule(),
      ],
      providers: [
        AuthenticationService,
        EnvironmentService,
        ToastService,
        IconService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
        provideStore({ user: userReducer }),
        provideEffects([userEffects]),
        provideZonelessChangeDetection(),
      ],
    });
    fixture = TestBed.createComponent(AuthOverview);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    controller = TestBed.inject(HttpTestingController);
    const envService = TestBed.inject(EnvironmentService);
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(API);
    fixture.detectChanges();
  });

  it('I-Test-1: Successful login process', async () => {
    // Click on the login button to get the login form
    const login = getHTMLElement<HTMLButtonElement>(fixture, '#login')!;
    login.click();
    await fixture.whenStable();

    // Add valid values to the login form
    const email = getHTMLElement<HTMLInputElement>(fixture, '#email')!;
    const password = getHTMLElement<HTMLInputElement>(fixture, '#password')!;
    email.value = TestUser.email;
    password.value = '1234';
    setInputValues([email, password]);
    await fixture.whenStable();

    // Click on the login button to trigger a HTTP request
    const submit = getHTMLElement<HTMLButtonElement>(fixture, '#login-button')!;
    submit.click();
    await fixture.whenStable();

    // Define the response of the HTTP request
    const req = controller.expectOne(loginPath());
    req.flush(TestUser);
    await fixture.whenStable();

    // Proof if data is sent to the store
    store.select(selectUser).subscribe({
      next: state => {
        expect(state).toEqual(TestUser);
      },
    });
    expect(router.url.includes(PATHS.dashboard)).toBeTrue();
  });

  it('I-Test-2: Successful registration process', async () => {
    // Click on the register button to get the register form
    const register = getHTMLElement<HTMLButtonElement>(fixture, '#register')!;
    register.click();
    await fixture.whenStable();

    // Add valid values to the register form
    const email = getHTMLElement<HTMLInputElement>(fixture, '#email')!;
    const username = getHTMLElement<HTMLInputElement>(fixture, '#username')!;
    const password = getHTMLElement<HTMLInputElement>(fixture, '#password')!;
    email.value = TestUser.email;
    username.value = TestUser.name;
    password.value = TestRegisterDTO.password;
    setInputValues([email, username, password]);
    await fixture.whenStable();

    // Click on the login button to trigger a HTTP request
    const submit = getHTMLElement<HTMLButtonElement>(fixture, '#register-btn')!;
    submit.click();
    await fixture.whenStable();

    // Define the response of the HTTP request
    const req = controller.expectOne(registerPath());
    req.flush(TestUser);
    await fixture.whenStable();

    // Proof if data is sent to the store
    store.select(selectUser).subscribe({
      next: state => {
        expect(state).toEqual(TestUser);
      },
    });
    expect(router.url.includes(PATHS.dashboard)).toBeTrue();
  });

  it('I-Test-3: Successful reset password process', async () => {
    // Click on the login button to get the login form
    const login = getHTMLElement<HTMLButtonElement>(fixture, '#login')!;
    login.click();
    await fixture.whenStable();

    // Click on the forget password button
    const forgotPwd = getHTMLElement<HTMLButtonElement>(
      fixture,
      '#forget-pwd'
    )!;
    forgotPwd.click();
    await fixture.whenStable();

    // Add an email address where the security code should be sent
    const email = getHTMLElement<HTMLInputElement>(fixture, '#email')!;
    email.value = TestUser.email;
    setInputValues([email]);
    await fixture.whenStable();

    const submitEmail = getHTMLElement<HTMLButtonElement>(
      fixture,
      '#send-code-button'
    )!;
    submitEmail.click();
    await fixture.whenStable();

    // Define HTTP request
    const accessCodeReq = controller.expectOne(forgotPwdPath());
    accessCodeReq.flush(TestUser.email);
    await fixture.whenStable();

    // Set code
    const fields = getHTMLElements<HTMLInputElement>(fixture, 'input');
    fields.forEach(field => (field.value = '1'));
    setInputValues(fields);
    await fixture.whenStable();

    const submitCode = getHTMLElement<HTMLButtonElement>(
      fixture,
      '#proof-code-button'
    )!;
    submitCode.click();
    await fixture.whenStable();

    // Define HTTP request
    const postCodeReq = controller.expectOne(resetPwdPath());
    postCodeReq.flush(null);
    await fixture.whenStable();

    expect(router.url.includes(PATHS.login)).toBeTrue();
  });
});
