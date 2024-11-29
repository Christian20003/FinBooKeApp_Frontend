import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AuthOverviewComponent } from './auth-overview.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { AuthenticationService } from './authentication.service';
import { authRoutes } from '../auth-routing-module';
import { Router, RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  LoadingComponent,
  SmallErrorMsgComponent,
  initialState,
} from 'src/app/shared/index';
import { of, throwError } from 'rxjs';
import { GetCodeComponent } from './get-code/get-code.component';
import { SetCodeComponent } from './set-code/set-code.component';
import { NgZone } from '@angular/core';
import { getNativeElement } from 'src/app/testing/testing-support';

describe('AuthOverviewComponent', () => {
  let component: AuthOverviewComponent;
  let fixture: ComponentFixture<AuthOverviewComponent>;
  let router: Router;
  let mockStore: MockStore;
  let stubService = jasmine.createSpyObj('AuthenticationService', [
    'postLogin',
    'postRegister',
    'postEmail',
    'postCode',
  ]);
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

  const createComponent = () => {
    stubService = jasmine.createSpyObj('AuthenticationService', [
      'postLogin',
      'postRegister',
      'postEmail',
      'postCode',
    ]);
    TestBed.configureTestingModule({
      declarations: [
        AuthOverviewComponent,
        MockComponent(LoginComponent),
        MockComponent(RegisterComponent),
        MockComponent(LoadingComponent),
        MockComponent(SmallErrorMsgComponent),
        MockComponent(GetCodeComponent),
        MockComponent(SetCodeComponent),
      ],
      imports: [BrowserAnimationsModule, RouterModule.forRoot(authRoutes)],
      providers: [
        { provide: AuthenticationService, useValue: stubService },
        provideMockStore({ initialState }),
      ],
    });
    fixture = TestBed.createComponent(AuthOverviewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  };

  /*-----------------------------------------------------Route testing--------------------------------------------------------*/

  describe('- Route testing', () => {
    beforeEach(createComponent);

    it('U-Test-1: Clicking login button should change the route to "/login"', () => {
      const button = getNativeElement<AuthOverviewComponent, HTMLButtonElement>(
        fixture,
        '#login'
      );
      const navigateSpy = spyOn(router, 'navigate');
      button.click();
      expect(navigateSpy).toHaveBeenCalledWith(['login']);
    });

    it('U-Test-2: Clicking register button should change the route to "/register"', () => {
      const button = getNativeElement<AuthOverviewComponent, HTMLButtonElement>(
        fixture,
        '#register'
      );
      const navigateSpy = spyOn(router, 'navigate');
      button.click();
      expect(navigateSpy).toHaveBeenCalledWith(['register']);
    });

    it('U-Test-3: The onForgetPwd function should change the route to "/login/resetPassword"', () => {
      const navigateSpy = spyOn(router, 'navigate');
      component.onForgetPwd();
      expect(navigateSpy).toHaveBeenCalledWith(['login', 'resetPassword']);
    });

    it('U-Test-4: The isLogin function should return true if the keyword "login" is in the path', fakeAsync(() => {
      const ngZone = new NgZone({});
      ngZone.run(() => {
        router.navigate(['/login']).then(() => {
          expect(component.isLogin()).toBeTrue();
        });
      });
    }));

    it('U-Test-5: The isLogin function should return false if the keyword "login" is not in the path', () => {
      expect(component.isLogin()).toBeFalse();
    });

    it('U-Test-6: The isCode function should return true if the keyword "resetPassword" is in the path', fakeAsync(() => {
      const ngZone = new NgZone({});
      ngZone.run(() => {
        router.navigate(['/login/resetPassword']).then(() => {
          expect(component.isCode()).toBeTrue();
        });
      });
    }));

    it('U-Test-7: The isCode function should return false if the keyword "resetPassword" is not in the path', () => {
      expect(component.isCode()).toBeFalse();
    });
  });

  /*-------------------------------------------------Component appearing------------------------------------------------------*/

  describe('- Component Appearing', () => {
    let ngZone = new NgZone({});

    beforeEach(() => {
      createComponent();
      ngZone = new NgZone({});
    });

    it('U-Test-8: Should create', () => {
      expect(component).toBeTruthy();
    });

    it('U-Test-9: Login component should appear after navigating to "/login"', fakeAsync(() => {
      ngZone.run(() => {
        router.navigate(['/login']).then(() => {
          fixture.detectChanges();
          const loginComp = getNativeElement<
            AuthOverviewComponent,
            LoginComponent
          >(fixture, 'app-login');
          expect(loginComp).toBeTruthy();
        });
      });
    }));

    it('U-Test-10: Register component should appear after navigating to "/register"', fakeAsync(() => {
      ngZone.run(() => {
        router.navigate(['/register']).then(() => {
          fixture.detectChanges();
          const registerComp = getNativeElement<
            AuthOverviewComponent,
            RegisterComponent
          >(fixture, 'app-register');
          expect(registerComp).toBeTruthy();
        });
      });
    }));

    it('U-Test-11: GetCode component should appear after navigating to "/login/resetPassword" and empty email', fakeAsync(() => {
      ngZone.run(() => {
        router.navigate(['/login/resetPassword']).then(() => {
          fixture.detectChanges();
          const getCodeComp = getNativeElement<
            AuthOverviewComponent,
            GetCodeComponent
          >(fixture, 'app-get-code');
          expect(getCodeComp).toBeTruthy();
        });
      });
    }));

    it('U-Test-12: SetCode component should appear after navigating to "/login/resetPassword" and not empty email', fakeAsync(() => {
      component.email = 'max@mustermann.com';
      ngZone.run(() => {
        router.navigate(['/login/resetPassword']).then(() => {
          fixture.detectChanges();
          const setCodeComp = getNativeElement<
            AuthOverviewComponent,
            SetCodeComponent
          >(fixture, 'app-set-code');
          expect(setCodeComp).toBeTruthy();
        });
      });
    }));

    it('U-Test-13: Loading component should not be visible at default', () => {
      const loadingComp = getNativeElement<
        AuthOverviewComponent,
        LoadingComponent
      >(fixture, 'app-loading');
      expect(loadingComp).toBeFalsy();
    });

    it('U-Test-14: Loading component should be visible when corresponding attribute is true', () => {
      component.waiting = true;
      fixture.detectChanges();
      const loadingComp = getNativeElement<
        AuthOverviewComponent,
        LoadingComponent
      >(fixture, 'app-loading');
      expect(loadingComp).toBeTruthy();
    });

    it('U-Test-15: Small-error-message component should not be visible at default', () => {
      const errorComp = getNativeElement<
        AuthOverviewComponent,
        SmallErrorMsgComponent
      >(fixture, 'app-small-error-msg');
      expect(errorComp).toBeFalsy();
    });

    it('U-Test-16: Small-error-message component should be visible if the string is not empty', () => {
      component.error = 'Test';
      fixture.detectChanges();
      const errorComp = getNativeElement<
        AuthOverviewComponent,
        SmallErrorMsgComponent
      >(fixture, 'app-small-error-msg');
      expect(errorComp).toBeTruthy();
    });
  });

  /*-----------------------------------------------------onSubmitLogin----------------------------------------------------------*/

  describe('- onSubmitLogin', () => {
    const loginData = {
      email: 'test.test@test.com',
      password: '123',
    };

    beforeEach(createComponent);

    it('U-Test-17: After calling function, the error attribute should be empty and waiting should be true', () => {
      stubService.postLogin.and.returnValue(of());
      component.onSubmitLogin(loginData);
      fixture.detectChanges();
      expect(component.waiting).toBeTrue();
      expect(component.error).toBe('');
    });

    it('U-Test-18: After calling function and getting a truthy result, the error attribute should be empty waiting should be false', () => {
      stubService.postLogin.and.returnValue(of(user));
      component.onSubmitLogin(loginData);
      fixture.detectChanges();
      expect(component.waiting).toBeFalse();
      expect(component.error).toBe('');
    });

    it('U-Test-19: After calling function and getting an error, waiting should be false and error should have specific message', () => {
      stubService.postLogin.and.returnValue(
        throwError(() => {
          return new Error('Es ist ein unerwarteter Fehler eingetreten.');
        })
      );
      component.onSubmitLogin(loginData);
      fixture.detectChanges();
      expect(component.waiting).toBeFalse();
      expect(component.error).toBe(
        'Es ist ein unerwarteter Fehler eingetreten.'
      );
    });

    it('U-Test-20: After calling function and getting an error, SmallError component should be displayed', () => {
      stubService.postLogin.and.returnValue(
        throwError(() => {
          return new Error('Es ist ein unerwarteter Fehler eingetreten.');
        })
      );
      component.onSubmitLogin(loginData);
      fixture.detectChanges();
      const errorComp = getNativeElement<
        AuthOverviewComponent,
        SmallErrorMsgComponent
      >(fixture, 'app-small-error-msg');
      expect(errorComp).toBeTruthy();
    });

    it('U-Test-21: After calling function with an successfull http request, the dispatch function of the store should be called', () => {
      spyOn(mockStore, 'dispatch');
      stubService.postLogin.and.returnValue(of(user));
      component.onSubmitLogin(loginData);
      fixture.detectChanges();
      expect(mockStore.dispatch).toHaveBeenCalled();
    });
  });

  /*----------------------------------------------------onSubmitRegister--------------------------------------------------------*/

  describe('- onSubmitRegister', () => {
    const registerData = {
      email: 'test.test@test.com',
      name: 'dummy',
      password: '123',
    };

    beforeEach(createComponent);

    it('U-Test-22: After calling function, the error attribute should be empty and waiting should be true', () => {
      stubService.postRegister.and.returnValue(of());
      component.onSubmitRegister(registerData);
      fixture.detectChanges();
      expect(component.waiting).toBeTrue();
      expect(component.error).toBe('');
    });

    it('U-Test-23: After calling function and getting a truthy result, the error attribute should be empty waiting should be false', () => {
      stubService.postRegister.and.returnValue(of(user));
      component.onSubmitRegister(registerData);
      fixture.detectChanges();
      expect(component.waiting).toBeFalse();
      expect(component.error).toBe('');
    });

    it('U-Test-24: After calling function and getting an error, waiting should be false and error should have specific message', () => {
      stubService.postRegister.and.returnValue(
        throwError(() => {
          return new Error('Es ist ein unerwarteter Fehler eingetreten.');
        })
      );
      component.onSubmitRegister(registerData);
      fixture.detectChanges();
      expect(component.waiting).toBeFalse();
      expect(component.error).toBe(
        'Es ist ein unerwarteter Fehler eingetreten.'
      );
    });

    it('U-Test-25: After calling function and getting an error, SmallError component should be displayed', () => {
      stubService.postRegister.and.returnValue(
        throwError(() => {
          return new Error('Es ist ein unerwarteter Fehler eingetreten.');
        })
      );
      component.onSubmitRegister(registerData);
      fixture.detectChanges();
      const errorComp = getNativeElement<
        AuthOverviewComponent,
        SmallErrorMsgComponent
      >(fixture, 'app-small-error-msg');
      expect(errorComp).toBeTruthy();
    });

    it('U-Test-26: After calling function with an successfull http request, the dispatch function of the store should be called', () => {
      spyOn(mockStore, 'dispatch');
      stubService.postRegister.and.returnValue(of(user));
      component.onSubmitRegister(registerData);
      fixture.detectChanges();
      expect(mockStore.dispatch).toHaveBeenCalled();
    });
  });

  /*----------------------------------------------------onSubmitRegister--------------------------------------------------------*/

  describe('- onSubmitRegister', () => {
    const registerData = {
      email: 'test.test@test.com',
      name: 'dummy',
      password: '123',
    };

    beforeEach(createComponent);

    it('U-Test-27: After calling function, the error attribute should be empty and waiting should be true', () => {
      stubService.postRegister.and.returnValue(of());
      component.onSubmitRegister(registerData);
      fixture.detectChanges();
      expect(component.waiting).toBeTrue();
      expect(component.error).toBe('');
    });

    it('U-Test-28: After calling function and getting a truthy result, the error attribute should be empty waiting should be false', () => {
      stubService.postRegister.and.returnValue(of(user));
      component.onSubmitRegister(registerData);
      fixture.detectChanges();
      expect(component.waiting).toBeFalse();
      expect(component.error).toBe('');
    });

    it('U-Test-29: After calling function and getting an error, waiting should be false and error should have specific message', () => {
      stubService.postRegister.and.returnValue(
        throwError(() => {
          return new Error('Es ist ein unerwarteter Fehler eingetreten.');
        })
      );
      component.onSubmitRegister(registerData);
      fixture.detectChanges();
      expect(component.waiting).toBeFalse();
      expect(component.error).toBe(
        'Es ist ein unerwarteter Fehler eingetreten.'
      );
    });

    it('U-Test-30: After calling function and getting an error, SmallError component should be displayed', () => {
      stubService.postRegister.and.returnValue(
        throwError(() => {
          return new Error('Es ist ein unerwarteter Fehler eingetreten.');
        })
      );
      component.onSubmitRegister(registerData);
      fixture.detectChanges();
      const errorComp = getNativeElement<
        AuthOverviewComponent,
        SmallErrorMsgComponent
      >(fixture, 'app-small-error-msg');
      expect(errorComp).toBeTruthy();
    });

    it('U-Test-31: After calling function with an successfull http request, the dispatch function of the store should be called', () => {
      spyOn(mockStore, 'dispatch');
      stubService.postRegister.and.returnValue(of(user));
      component.onSubmitRegister(registerData);
      fixture.detectChanges();
      expect(mockStore.dispatch).toHaveBeenCalled();
    });
  });

  /*---------------------------------------------------------onSetCode------------------------------------------------------------*/

  describe('- onSetCode', () => {
    const securityCode = {
      value1: 1,
      value2: 1,
      value3: 1,
      value4: 1,
      value5: 1,
      value6: 1,
    };

    beforeEach(createComponent);

    it('U-Test-32: After calling function, the error attribute should be empty and waiting should be true', () => {
      stubService.postCode.and.returnValue(of());
      component.onSetCode(securityCode);
      fixture.detectChanges();
      expect(component.waiting).toBeTrue();
      expect(component.error).toBe('');
    });

    it('U-Test-33: After calling function and getting a truthy result, the error attribute should be empty waiting should be false', () => {
      stubService.postCode.and.returnValue(of('Success'));
      component.onSetCode(securityCode);
      fixture.detectChanges();
      expect(component.waiting).toBeFalse();
      expect(component.error).toBe('');
    });

    it('U-Test-34: After calling function and getting an error, waiting should be false and error should have specific message', () => {
      stubService.postCode.and.returnValue(
        throwError(() => {
          return new Error('Es ist ein unerwarteter Fehler eingetreten.');
        })
      );
      component.onSetCode(securityCode);
      fixture.detectChanges();
      expect(component.waiting).toBeFalse();
      expect(component.error).toBe(
        'Es ist ein unerwarteter Fehler eingetreten.'
      );
    });

    it('U-Test-35: After calling function and getting an error, SmallError component should be displayed', () => {
      stubService.postCode.and.returnValue(
        throwError(() => {
          return new Error('Es ist ein unerwarteter Fehler eingetreten.');
        })
      );
      component.onSetCode(securityCode);
      fixture.detectChanges();
      const errorComp = getNativeElement<
        AuthOverviewComponent,
        SmallErrorMsgComponent
      >(fixture, 'app-small-error-msg');
      expect(errorComp).toBeTruthy();
    });

    it('U-Test-36: After calling function with an successfull http request, a navigation to loginPath should appear', () => {
      const navigateSpy = spyOn(router, 'navigate');
      stubService.postCode.and.returnValue(of('Success'));
      component.onSetCode(securityCode);
      fixture.detectChanges();
      expect(navigateSpy).toHaveBeenCalledWith(['login']);
    });
  });

  /*---------------------------------------------------------onSetEmail-----------------------------------------------------------*/

  describe('- onSetEmail', () => {
    const email = 'max@mustermann.com';

    beforeEach(createComponent);

    it('U-Test-37: After calling function, the error attribute should be empty and waiting should be true', () => {
      stubService.postEmail.and.returnValue(of());
      component.onSetEmail(email);
      fixture.detectChanges();
      expect(component.waiting).toBeTrue();
      expect(component.error).toBe('');
    });

    it('U-Test-38: After calling function and getting a truthy result, the error attribute should be empty waiting should be false', () => {
      stubService.postEmail.and.returnValue(of(email));
      component.onSetEmail(email);
      fixture.detectChanges();
      expect(component.waiting).toBeFalse();
      expect(component.error).toBe('');
    });

    it('U-Test-39: After calling function and getting an error, waiting should be false and error should have specific message', () => {
      stubService.postEmail.and.returnValue(
        throwError(() => {
          return new Error('Es ist ein unerwarteter Fehler eingetreten.');
        })
      );
      component.onSetEmail(email);
      fixture.detectChanges();
      expect(component.waiting).toBeFalse();
      expect(component.error).toBe(
        'Es ist ein unerwarteter Fehler eingetreten.'
      );
    });

    it('U-Test-40: After calling function and getting an error, SmallError component should be displayed', () => {
      stubService.postEmail.and.returnValue(
        throwError(() => {
          return new Error('Es ist ein unerwarteter Fehler eingetreten.');
        })
      );
      component.onSetEmail(email);
      fixture.detectChanges();
      const errorComp = getNativeElement<
        AuthOverviewComponent,
        SmallErrorMsgComponent
      >(fixture, 'app-small-error-msg');
      expect(errorComp).toBeTruthy();
    });

    it('U-Test-41: After calling function with an successfull http request, a navigation to loginPath should appear', () => {
      stubService.postEmail.and.returnValue(of(email));
      component.onSetEmail(email);
      fixture.detectChanges();
      expect(component.email).toBeTruthy();
      expect(component.email).toBe(email);
    });
  });
});
