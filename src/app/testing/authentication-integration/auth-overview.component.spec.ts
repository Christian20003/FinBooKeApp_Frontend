import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AuthOverviewComponent } from 'src/app/auth/auth-overview/auth-overview.component';
import { AuthenticationService } from 'src/app/auth/auth-overview/authentication.service';
import { GetCodeComponent } from 'src/app/auth/auth-overview/get-code/get-code.component';
import { LoginComponent } from 'src/app/auth/auth-overview/login/login.component';
import { RegisterComponent } from 'src/app/auth/auth-overview/register/register.component';
import { SetCodeComponent } from 'src/app/auth/auth-overview/set-code/set-code.component';
import { loginPath } from 'src/app/auth/auth-routing-module';
import {
  LoadingComponent,
  selectUser,
  TestUser,
  Toast,
  ToastRemoveType,
  ToastTypes,
  userEffects,
  userReducer,
} from 'src/app/shared';
import { EnvironmentService } from 'src/app/dev-tools/environment.service';
import { ToastService } from 'src/app/shared/components/toasts/toast.service';
import { dashboardPath, routes } from 'src/app/routing/app-routing.module';
import {
  getNativeElement,
  getNativeElements,
  triggerInput,
} from '../testing-support';
import { getTranslocoModule } from '../transloco-testing.module';

describe('AuthOverviewComponent', () => {
  let fixture: ComponentFixture<AuthOverviewComponent>;
  let router: Router;
  let store: Store;
  let httpTestingController: HttpTestingController;
  let envService: EnvironmentService;
  let authService: AuthenticationService;
  let toastService: ToastService;
  const api = 'http://testing';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuthOverviewComponent,
        LoginComponent,
        RegisterComponent,
        LoadingComponent,
        SetCodeComponent,
        GetCodeComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        StoreModule.forRoot({ user: userReducer }, {}),
        EffectsModule.forRoot([userEffects]),
        ReactiveFormsModule,
        MatIconModule,
        getTranslocoModule(),
      ],
      providers: [
        AuthenticationService,
        EnvironmentService,
        ToastService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AuthOverviewComponent);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    envService = TestBed.inject(EnvironmentService);
    authService = TestBed.inject(AuthenticationService);
    toastService = TestBed.inject(ToastService);
    httpTestingController = TestBed.inject(HttpTestingController);
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(api);
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
    // navigate() is called which is async
    flush();
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
    email.value = TestUser.email;
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
    // @ts-expect-error Getting the relativ path
    const path = api + authService.LOGIN_PATH;
    const req = httpTestingController.expectOne(path);
    req.flush(TestUser);

    // Proof if data is sent to the store
    store.select(selectUser).subscribe({
      next: state => {
        expect(state.id)
          .withContext('Id property has incorrect value')
          .toBe(TestUser.id);
        expect(state.name)
          .withContext('Name property has incorrect value')
          .toBe(TestUser.name);
        expect(state.imagePath)
          .withContext('Image path property has incorrect value')
          .toBe(TestUser.imagePath);
        expect(state.email)
          .withContext('Email property has incorrect value')
          .toBe(TestUser.email);
        expect(state.session)
          .withContext('Session property has incorrect values')
          .toEqual(TestUser.session);
      },
    });
    // navigate() is async
    flush();
    expect(router.url)
      .withContext(
        'Final route after successful login process should be /dashboard'
      )
      .toBe('/' + dashboardPath);
  }));

  it('I-Test-2: Completely successful reset password process', fakeAsync(() => {
    // Click on the login button to get the login form
    const loginButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#login');
    loginButton.click();
    // navigate() is called which is async
    flush();
    fixture.detectChanges();

    // Click on the forget password button
    const forgetPwdButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#forget-pwd');
    forgetPwdButton.click();
    // navigate() is called which is async
    flush();
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
    email.value = TestUser.email;
    triggerInput([email]);
    submitEmail.click();

    // Define HTTP request
    // @ts-expect-error Getting the relativ path
    const path = api + authService.CODE_PATH;
    const postEmailReq = httpTestingController.expectOne(
      path,
      'Post email address request'
    );
    postEmailReq.flush(TestUser.email);
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
      path,
      'Post security code request'
    );
    postCodeReq.flush('Success');
    fixture.detectChanges();

    // navigate() is called which is async
    flush();
    expect(router.url)
      .withContext(
        'Final route after successful forget-password process should be /login'
      )
      .toBe('/' + loginPath);
  }));

  it('I-Test-3: Completely unsuccessful login process', fakeAsync(() => {
    // Click on the login button to get the login form
    const loginButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#login');
    loginButton.click();
    // navigate() is called which is async
    flush();
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
    email.value = TestUser.email;
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
    // @ts-expect-error Getting the relativ path
    const path = api + authService.LOGIN_PATH;
    const req = httpTestingController.expectOne(path);
    const error = new HttpErrorResponse({ status: 406 });
    req.flush('Error occurred', error);
    fixture.detectChanges();

    toastService.toastStore$.subscribe(data => {
      const toast: Toast = {
        id: 1,
        message: 'The given account data is incorrect',
        type: ToastTypes.ERROR,
        autoRemove: ToastRemoveType.NONE,
      };
      expect(data)
        .withContext(
          'The following toast object should be displayed to the user'
        )
        .toEqual([toast]);
    });
  }));

  it('I-Test-4: Completely unsuccessful reset password process by getting HTTP-Error on posting email', fakeAsync(() => {
    // Click on the login button to get the login form
    const loginButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#login');
    loginButton.click();
    // navigate() is called which is async
    flush();
    fixture.detectChanges();

    // Click on the forget password button
    const forgetPwdButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#forget-pwd');
    forgetPwdButton.click();
    // navigate() is called which is async
    flush();
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
    email.value = TestUser.email;
    triggerInput([email]);
    submitEmail.click();

    // Define HTTP request
    // @ts-expect-error Getting the relativ path
    const path = api + authService.CODE_PATH;
    const postEmailReq = httpTestingController.expectOne(
      path,
      'Post email address request'
    );
    const error = new HttpErrorResponse({ status: 404 });
    postEmailReq.flush('Resource not found', error);
    fixture.detectChanges();

    toastService.toastStore$.subscribe(data => {
      const toast: Toast = {
        id: 1,
        message: 'The requested resource could not be found',
        type: ToastTypes.ERROR,
        autoRemove: ToastRemoveType.NONE,
      };
      expect(data)
        .withContext(
          'The following toast object should be displayed to the user'
        )
        .toEqual([toast]);
    });
  }));

  it('I-Test-5: Completely unsuccessful reset password process by getting HTTP-Error on posting security code', fakeAsync(() => {
    // Click on the login button to get the login form
    const loginButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#login');
    loginButton.click();
    // navigate() is called which is async
    flush();
    fixture.detectChanges();

    // Click on the forget password button
    const forgetPwdButton = getNativeElement<
      AuthOverviewComponent,
      HTMLButtonElement
    >(fixture, '#forget-pwd');
    forgetPwdButton.click();
    // navigate() is called which is async
    flush();
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
    email.value = TestUser.email;
    triggerInput([email]);
    submitEmail.click();

    // Define HTTP request
    // @ts-expect-error Getting the relativ path
    const path = api + authService.CODE_PATH;
    const postEmailReq = httpTestingController.expectOne(
      path,
      'Post email address request'
    );
    postEmailReq.flush(TestUser.email);
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
      path,
      'Post security code request'
    );
    const error = new HttpErrorResponse({ status: 500 });
    postCodeReq.flush('Server error', error);
    fixture.detectChanges();

    toastService.toastStore$.subscribe(data => {
      const toast: Toast = {
        id: 1,
        message: 'The requested service is currently not available',
        type: ToastTypes.ERROR,
        autoRemove: ToastRemoveType.NONE,
      };
      expect(data)
        .withContext(
          'The following toast object should be displayed to the user'
        )
        .toEqual([toast]);
    });
  }));
});
