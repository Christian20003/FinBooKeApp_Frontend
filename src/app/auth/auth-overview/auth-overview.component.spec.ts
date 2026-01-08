import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockModule } from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { getNativeElement } from 'src/app/testing/testing-support';
import { ToastService } from 'src/app/core/services/toast/toast-service';
import { routes } from 'src/app/routing/app-routing.module';
import { LoadingComponent, initialState } from 'src/app/shared/index';
import { TestUser, ToastLifeTime, ToastType } from 'src/app/core/index';
import { AuthOverviewComponent } from './auth-overview.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './authentication.service';
import { RequestAccessCodeComponent } from '../request-access-code/request-access-code';
import { SetCodeComponent } from './set-code/set-code.component';
import {
  loginPath,
  registerPath,
  resetPasswordPath,
} from '../auth-routing-module';
import { TestLoginData } from '../models/loginData';
import { TestRegisterData } from '../models/registerData';
import { AuthModule } from '../auth.module';

/* eslint-disable @typescript-eslint/no-explicit-any */

xdescribe('AuthOverviewComponent', () => {
  let component: AuthOverviewComponent;
  let fixture: ComponentFixture<AuthOverviewComponent>;
  let router: Router;
  let mockStore: MockStore;
  let authService: any;
  let toastService: any;

  const createComponent = async () => {
    authService = jasmine.createSpyObj('AuthenticationService', [
      'postLogin',
      'postRegister',
      'postEmail',
      'postCode',
    ]);
    toastService = jasmine.createSpyObj('ToastService', ['addToast']);
    await TestBed.configureTestingModule({
      declarations: [AuthOverviewComponent],
      imports: [
        MockModule(AuthModule),
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        MatIconModule,
      ],
      providers: [
        { provide: AuthenticationService, useValue: authService },
        { provide: ToastService, useValue: toastService },
        provideMockStore({ initialState }),
        provideHttpClient(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AuthOverviewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  };

  /*-----------------------------------------------------Route testing--------------------------------------------------------*/

  xdescribe('Route testing', () => {
    beforeEach(createComponent);

    it('U-Test-1: Clicking login button should change the route to "/login"', () => {
      const button = getNativeElement<AuthOverviewComponent, HTMLButtonElement>(
        fixture,
        '#login'
      );
      const navigateSpy = spyOn(router, 'navigate');
      button.click();
      expect(navigateSpy)
        .withContext('App should be at route /login')
        .toHaveBeenCalledWith([loginPath]);
    });

    it('U-Test-2: Clicking register button should change the route to "/register"', () => {
      const button = getNativeElement<AuthOverviewComponent, HTMLButtonElement>(
        fixture,
        '#register'
      );
      const navigateSpy = spyOn(router, 'navigate');
      button.click();
      expect(navigateSpy)
        .withContext('App should be at route /register')
        .toHaveBeenCalledWith([registerPath]);
    });

    it('U-Test-3: The onForgetPwd function should change the route to "/login/resetPassword"', () => {
      const navigateSpy = spyOn(router, 'navigate');
      component.onForgetPwd();
      expect(navigateSpy)
        .withContext('App should be at route /login/forgetPassword')
        .toHaveBeenCalledWith([loginPath, resetPasswordPath]);
    });

    it('U-Test-4: The isLogin function should return true if the keyword "login" is in the path', async () => {
      await router.navigate([loginPath]);
      expect(component.isLogin())
        .withContext('isLogin function should return true')
        .toBeTrue();
    });

    it('U-Test-5: The isLogin function should return false if the keyword "login" is not in the path', () => {
      expect(component.isLogin())
        .withContext('isLogin function should return false')
        .toBeFalse();
    });

    it('U-Test-6: The isCode function should return true if the keyword "resetPassword" is in the path', async () => {
      await router.navigate([loginPath, resetPasswordPath]);
      expect(component.isCode())
        .withContext('isCode function should return true')
        .toBeTrue();
    });

    it('U-Test-7: The isCode function should return false if the keyword "resetPassword" is not in the path', () => {
      expect(component.isCode())
        .withContext('isCode function should return false')
        .toBeFalse();
    });
  });

  /*-------------------------------------------------Component appearing------------------------------------------------------*/

  xdescribe('Component Appearing', () => {
    beforeEach(createComponent);

    it('U-Test-8: Should create', () => {
      expect(component)
        .withContext('AuthOverviewComponent should exist')
        .toBeTruthy();
    });

    it('U-Test-9: Login component should appear after navigating to "/login"', async () => {
      await router.navigate([loginPath]);
      fixture.detectChanges();
      const loginComp = getNativeElement<AuthOverviewComponent, LoginComponent>(
        fixture,
        'app-login'
      );
      expect(loginComp)
        .withContext('LoginComponent should be present')
        .toBeTruthy();
    });

    it('U-Test-10: Register component should appear after navigating to "/register"', async () => {
      await router.navigate(['/register']);
      fixture.detectChanges();
      const registerComp = getNativeElement<
        AuthOverviewComponent,
        RegisterComponent
      >(fixture, 'app-register');
      expect(registerComp)
        .withContext('RegisterComponent should be present')
        .toBeTruthy();
    });

    it('U-Test-11: GetCode component should appear after navigating to "/login/resetPassword" and empty email', async () => {
      await router.navigate(['/login/resetPassword']);
      fixture.detectChanges();
      const getCodeComp = getNativeElement<
        AuthOverviewComponent,
        RequestAccessCodeComponent
      >(fixture, 'app-request-access-code');
      expect(getCodeComp)
        .withContext('RequestAccessCodeComponent should be present')
        .toBeTruthy();
    });

    it('U-Test-12: SetCode component should appear after navigating to "/login/resetPassword" and not empty email', async () => {
      component.email = 'max@mustermann.com';
      await router.navigate([loginPath, resetPasswordPath]);
      fixture.detectChanges();
      const setCodeComp = getNativeElement<
        AuthOverviewComponent,
        SetCodeComponent
      >(fixture, 'app-set-code');
      expect(setCodeComp)
        .withContext('SetCodeComponent should be present')
        .toBeTruthy();
    });

    it('U-Test-13: Loading component should not be visible at default', () => {
      const loadingComp = getNativeElement<
        AuthOverviewComponent,
        LoadingComponent
      >(fixture, 'app-loading');
      expect(loadingComp)
        .withContext('LoadingComponent should not be present by default')
        .toBeFalsy();
    });

    it('U-Test-14: Loading component should be visible when corresponding attribute is true', () => {
      component.waiting = true;
      fixture.detectChanges();
      const loadingComp = getNativeElement<
        AuthOverviewComponent,
        LoadingComponent
      >(fixture, 'app-loading');
      expect(loadingComp)
        .withContext('LoadingComponent should be present')
        .toBeTruthy();
    });
  });

  /*-----------------------------------------------------onSubmitLogin----------------------------------------------------------*/

  xdescribe('onSubmitLogin', () => {
    beforeEach(createComponent);

    it('U-Test-15: Calling postLogin function and waiting for the response', () => {
      authService.postLogin.and.returnValue(of());
      component.onSubmitLogin(TestLoginData);
      fixture.detectChanges();
      expect(component.waiting)
        .withContext('Waiting flag should be true')
        .toBeTrue();
    });

    it('U-Test-16: Calling postLogin function and getting a success result', () => {
      const spy = spyOn(mockStore, 'dispatch');
      authService.postLogin.and.returnValue(of(TestUser));
      component.onSubmitLogin(TestLoginData);
      fixture.detectChanges();
      expect(component.waiting)
        .withContext('Waiting flag should be false')
        .toBeFalse();
      expect(spy)
        .withContext('User object should be transmitted to store')
        .toHaveBeenCalled();
    });

    it('U-Test-17: Calling postLogin function and getting an error', () => {
      const errorMsg = 'Error occurred';
      authService.postLogin.and.returnValue(
        throwError(() => {
          return new Error(errorMsg);
        })
      );
      component.onSubmitLogin(TestLoginData);
      fixture.detectChanges();
      expect(component.waiting)
        .withContext('Waiting flag should be false')
        .toBeFalse();
      expect(toastService.addToast)
        .withContext('Error-Toast should be created')
        .toHaveBeenCalledWith(errorMsg, ToastType.ERROR, ToastLifeTime.NONE);
    });
  });

  /*----------------------------------------------------onSubmitRegister--------------------------------------------------------*/

  xdescribe('onSubmitRegister', () => {
    beforeEach(createComponent);

    it('U-Test-18: Calling postRegister function and waiting for a response', () => {
      authService.postRegister.and.returnValue(of());
      component.onSubmitRegister(TestRegisterData);
      fixture.detectChanges();
      expect(component.waiting)
        .withContext('Waiting flag should be true')
        .toBeTrue();
    });

    it('U-Test-19: Calling postResgister function and getting a success result', () => {
      const spy = spyOn(mockStore, 'dispatch');
      authService.postRegister.and.returnValue(of(TestUser));
      component.onSubmitRegister(TestRegisterData);
      fixture.detectChanges();
      expect(component.waiting)
        .withContext('Waiting flag should be false')
        .toBeFalse();
      expect(spy)
        .withContext('User object should be transmitted to the store')
        .toHaveBeenCalled();
    });

    it('U-Test-20: Calling postRegister function and getting an error', () => {
      const errorMsg = 'Error occurred';
      authService.postRegister.and.returnValue(
        throwError(() => {
          return new Error(errorMsg);
        })
      );
      component.onSubmitRegister(TestRegisterData);
      fixture.detectChanges();
      expect(component.waiting)
        .withContext('Waiting flag should be false')
        .toBeFalse();
      expect(toastService.addToast)
        .withContext('Error-Toast should be created')
        .toHaveBeenCalledWith(errorMsg, ToastType.ERROR, ToastLifeTime.NONE);
    });
  });

  /*---------------------------------------------------------onSetCode------------------------------------------------------------*/

  /* xdescribe('onSetCode', () => {
    beforeEach(createComponent);

    it('U-Test-21: Calling postCode function and waiting for the response', () => {
      authService.postCode.and.returnValue(of());
      component.onSetCode(TestSecurityCode);
      fixture.detectChanges();
      expect(component.waiting)
        .withContext('Waiting flag should be true')
        .toBeTrue();
    });

    it('U-Test-22: Calling postCode function and getting a success result', () => {
      const navigateSpy = spyOn(router, 'navigate');
      authService.postCode.and.returnValue(of('Success'));
      component.onSetCode(TestSecurityCode);
      fixture.detectChanges();
      expect(component.waiting)
        .withContext('Waiting flag should be false')
        .toBeFalse();
      expect(navigateSpy)
        .withContext('The route should be changed to /login')
        .toHaveBeenCalledWith([loginPath]);
    });

    it('U-Test-23: Calling postCode function and getting an error', () => {
      const errorMsg = 'Error occurred';
      authService.postCode.and.returnValue(
        throwError(() => {
          return new Error(errorMsg);
        })
      );
      component.onSetCode(TestSecurityCode);
      fixture.detectChanges();
      expect(component.waiting)
        .withContext('Waiting flag should be false')
        .toBeFalse();
      expect(toastService.addToast)
        .withContext('Error-Toast should be created')
        .toHaveBeenCalledWith(errorMsg, ToastTypes.ERROR, ToastRemoveType.NONE);
    });
  }); */

  /*---------------------------------------------------------onSetEmail-----------------------------------------------------------*/

  xdescribe('onSetEmail', () => {
    beforeEach(createComponent);

    it('U-Test-24: Calling postEmail function and waiting for a response', () => {
      authService.postEmail.and.returnValue(of());
      component.onSetEmail(TestUser.email);
      fixture.detectChanges();
      expect(component.waiting)
        .withContext('Waiting flag should be true')
        .toBeTrue();
    });

    it('U-Test-25: Calling postEmail function and getting a success result', () => {
      authService.postEmail.and.returnValue(of(TestUser.email));
      component.onSetEmail(TestUser.email);
      fixture.detectChanges();
      expect(component.waiting)
        .withContext('Waiting flag should be false')
        .toBeFalse();
      expect(component.email)
        .withContext('Email value should be the one from the request')
        .toBe(TestUser.email);
    });

    it('U-Test-26: After calling function and getting an error, waiting should be false and error should have specific message', () => {
      const errorMsg = 'Error occurred';
      authService.postEmail.and.returnValue(
        throwError(() => {
          return new Error(errorMsg);
        })
      );
      component.onSetEmail(TestUser.email);
      fixture.detectChanges();
      expect(component.waiting)
        .withContext('Waiting flag should be false')
        .toBeFalse();
      expect(toastService.addToast)
        .withContext('Error-Toast should be created')
        .toHaveBeenCalledWith(errorMsg, ToastType.ERROR, ToastLifeTime.NONE);
    });
  });
});
