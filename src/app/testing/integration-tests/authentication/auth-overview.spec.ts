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
  FormInputErrorComponent,
  LoadingComponent,
  selectUser,
  userEffects,
  userReducer,
} from 'src/app/shared';
import { AuthOverviewComponent } from 'src/app/authentication/auth-overview/auth-overview';
import {
  API_PATHS,
  AuthenticationService,
  EnvironmentService,
  IconService,
  PATHS,
  TestUser,
  ToastService,
} from 'src/app/core';
import { LoginComponent } from 'src/app/authentication/login/login';
import { RegisterComponent } from 'src/app/authentication/register/register';
import { SetAccessCodeComponent } from 'src/app/authentication/set-access-code/set-access-code';
import { RequestAccessCodeComponent } from 'src/app/authentication/request-access-code/request-access-code';
import { getTranslocoModule } from 'src/app/shared/localization/transloco-testing';
import { routes } from 'src/app/core/routing/routes';
import {
  getHTMLElement,
  getHTMLElements,
} from 'src/app/testing/helper/get-html-element';
import { setInputValues } from 'src/app/testing/helper/set-input-values';

describe('AuthOverviewComponent', () => {
  let fixture: ComponentFixture<AuthOverviewComponent>;
  let router: Router;
  let store: Store;
  let controller: HttpTestingController;

  const API = 'http://localhost';

  const loginPath = function (): string {
    return API + API_PATHS.auth.login;
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
        AuthOverviewComponent,
        LoginComponent,
        RegisterComponent,
        SetAccessCodeComponent,
        RequestAccessCodeComponent,
        LoadingComponent,
        FormInputErrorComponent,
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
    fixture = TestBed.createComponent(AuthOverviewComponent);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    controller = TestBed.inject(HttpTestingController);
    const envService = TestBed.inject(EnvironmentService);
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(API);
    fixture.detectChanges();
  });

  // TODO: Add integration tests for registration

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

  it('I-Test-2: Successful reset password process', async () => {
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
