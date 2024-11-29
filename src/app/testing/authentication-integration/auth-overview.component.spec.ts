import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { AuthOverviewComponent } from 'src/app/auth/auth-overview/auth-overview.component';
import { AuthenticationService } from 'src/app/auth/auth-overview/authentication.service';
import { GetCodeComponent } from 'src/app/auth/auth-overview/get-code/get-code.component';
import { LoginComponent } from 'src/app/auth/auth-overview/login/login.component';
import { RegisterComponent } from 'src/app/auth/auth-overview/register/register.component';
import { SetCodeComponent } from 'src/app/auth/auth-overview/set-code/set-code.component';
import { authRoutes } from 'src/app/auth/auth-routing-module';
import {
  LoadingComponent,
  selectUser,
  SmallErrorMsgComponent,
  userEffects,
  userReducer,
} from 'src/app/shared';
import {
  getComponent,
  getNativeElement,
  getNativeElements,
  triggerInput,
} from '../testing-support';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

describe('AuthOverviewComponent', () => {
  let component: AuthOverviewComponent;
  let fixture: ComponentFixture<AuthOverviewComponent>;
  let router: Router;
  let store: Store;
  let httpTestingController: HttpTestingController;
  const user = {
    id: 1,
    name: 'Max',
    imagePath: '/test',
    email: 'test-test@test.com',
    session: {
      token: '3435234',
      expire: 44,
    },
  };
  const requestPaths = {
    login: 'https://backend/login',
    register: 'https://backend/register',
    code: 'https://backend/login/code',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthOverviewComponent,
        LoginComponent,
        RegisterComponent,
        LoadingComponent,
        SmallErrorMsgComponent,
        SetCodeComponent,
        GetCodeComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot(authRoutes),
        StoreModule.forRoot({ user: userReducer }, {}),
        EffectsModule.forRoot([userEffects]),
        ReactiveFormsModule,
        MatIconModule,
      ],
      providers: [
        AuthenticationService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(AuthOverviewComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  // TODO: Add integration tests for registration

  it('I-Test-1: Completely successful login process', fakeAsync(() => {
    // Click on the login button to get the login form
    const loginButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#login');
    loginButton.click();
    tick(100);
    fixture.detectChanges();

    // Add valid values to the login form
    const email = getNativeElement<AuthOverviewComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const password = getNativeElement<AuthOverviewComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    email.value = user.email;
    password.value = '1234';
    triggerInput([email, password]);
    fixture.detectChanges();

    // Click on the login button to trigger a HTTP request
    const submit = getNativeElement<AuthOverviewComponent, HTMLButtonElement>(
      fixture,
      '#login-button'
    );
    submit.click();
    fixture.detectChanges();

    // Define the response of the HTTP request
    const req = httpTestingController.expectOne(requestPaths.login);
    user.email = 'test@doener.com';
    req.flush(user);

    // Proof if data is sent to the store
    store.select(selectUser).subscribe({
      next: state => {
        expect(state.id).toBe(user.id);
        expect(state.name).toBe(user.name);
        expect(state.imagePath).toBe(user.imagePath);
        expect(state.email).toBe(user.email);
        expect(state.session).toEqual(user.session);
      },
    });
    // TODO: Proof if the navigation was successful
  }));

  it('I-Test-2: Completely successful reset password process', fakeAsync(() => {
    // Click on the login button to get the login form
    const loginButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#login');
    loginButton.click();
    tick(100);
    fixture.detectChanges();

    // Click on the forget password button
    const forgetPwdButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#forget-pwd');
    forgetPwdButton.click();
    tick(100);
    fixture.detectChanges();

    // Add an email address where the security code should be sent
    const email = getNativeElement<AuthOverviewComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const submitEmail = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#send-code-button');
    email.value = user.email;
    triggerInput([email]);
    submitEmail.click();

    // Define HTTP request
    const postEmailReq = httpTestingController.expectOne(
      requestPaths.code,
      'Post email address request'
    );
    postEmailReq.flush(user.email);
    fixture.detectChanges();

    // Set code
    const codeFields = getNativeElements<
      AuthOverviewComponent,
      HTMLInputElement
    >(fixture, 'input');
    const submitCodeButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#proof-code-button');
    for (const field of codeFields) {
      field.value = '1';
    }
    triggerInput(codeFields);
    submitCodeButton.click();

    // Define HTTP request
    const postCodeReq = httpTestingController.expectOne(
      requestPaths.code,
      'Post security code request'
    );
    postCodeReq.flush('Success');
    fixture.detectChanges();

    tick(100);
    expect(router.url).toBe('/login');
  }));

  it('I-Test-3: Completely unsuccessful login process', fakeAsync(() => {
    // Click on the login button to get the login form
    const loginButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#login');
    loginButton.click();
    tick(100);
    fixture.detectChanges();

    // Add valid values to the login form
    const email = getNativeElement<AuthOverviewComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const password = getNativeElement<AuthOverviewComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    email.value = user.email;
    password.value = '1234';
    triggerInput([email, password]);
    fixture.detectChanges();

    // Click on the login button to trigger a HTTP request
    const submit = getNativeElement<AuthOverviewComponent, HTMLButtonElement>(
      fixture,
      '#login-button'
    );
    submit.click();
    fixture.detectChanges();

    // Define the response of the HTTP request
    const req = httpTestingController.expectOne(requestPaths.login);
    const error = new HttpErrorResponse({ status: 406 });
    req.flush('Ivalid Credentials', error);
    fixture.detectChanges();

    // Proof if error component shows up
    const errorComp = getComponent<
      AuthOverviewComponent,
      SmallErrorMsgComponent
    >(fixture, SmallErrorMsgComponent);
    expect(errorComp).toBeTruthy();
    expect(component.error).toBe(errorComp.componentInstance.message);
  }));

  it('I-Test-4: Completely unsuccessful reset password process by getting HTTP-Error on posting email', fakeAsync(() => {
    // Click on the login button to get the login form
    const loginButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#login');
    loginButton.click();
    tick(100);
    fixture.detectChanges();

    // Click on the forget password button
    const forgetPwdButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#forget-pwd');
    forgetPwdButton.click();
    tick(100);
    fixture.detectChanges();

    // Add an email address where the security code should be sent
    const email = getNativeElement<AuthOverviewComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const submitEmail = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#send-code-button');
    email.value = user.email;
    triggerInput([email]);
    submitEmail.click();

    // Define HTTP request
    const postEmailReq = httpTestingController.expectOne(
      requestPaths.code,
      'Post email address request'
    );
    const error = new HttpErrorResponse({ status: 404 });
    postEmailReq.flush('Resource not found', error);
    fixture.detectChanges();

    // Proof if error component shows up
    const errorComp = getComponent<
      AuthOverviewComponent,
      SmallErrorMsgComponent
    >(fixture, SmallErrorMsgComponent);
    expect(errorComp).toBeTruthy();
    expect(component.error).toBe(errorComp.componentInstance.message);
  }));

  it('I-Test-5: Completely unsuccessful reset password process by getting HTTP-Error on posting security code', fakeAsync(() => {
    // Click on the login button to get the login form
    const loginButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#login');
    loginButton.click();
    tick(100);
    fixture.detectChanges();

    // Click on the forget password button
    const forgetPwdButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#forget-pwd');
    forgetPwdButton.click();
    tick(100);
    fixture.detectChanges();

    // Add an email address where the security code should be sent
    const email = getNativeElement<AuthOverviewComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const submitEmail = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#send-code-button');
    email.value = user.email;
    triggerInput([email]);
    submitEmail.click();

    // Define HTTP request
    const postEmailReq = httpTestingController.expectOne(
      requestPaths.code,
      'Post email address request'
    );
    postEmailReq.flush(user.email);
    fixture.detectChanges();

    // Set code
    const codeFields = getNativeElements<
      AuthOverviewComponent,
      HTMLInputElement
    >(fixture, 'input');
    const submitCodeButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#proof-code-button');
    for (const field of codeFields) {
      field.value = '1';
    }
    triggerInput(codeFields);
    submitCodeButton.click();

    // Define HTTP request
    const postCodeReq = httpTestingController.expectOne(
      requestPaths.code,
      'Post security code request'
    );
    const error = new HttpErrorResponse({ status: 500 });
    postCodeReq.flush('Server error', error);
    fixture.detectChanges();

    // Proof if error component shows up
    const errorComp = getComponent<
      AuthOverviewComponent,
      SmallErrorMsgComponent
    >(fixture, SmallErrorMsgComponent);
    expect(errorComp).toBeTruthy();
    expect(component.error).toBe(errorComp.componentInstance.message);
  }));
});
