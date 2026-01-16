import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { TranslocoService } from '@jsverse/transloco';
import { TestLoginDTO } from 'src/app/core/models/authentication/loginDTO';
import { TestRegisterDTO } from 'src/app/core/models/authentication/registerDTO';
import { isIUser, TestUser } from 'src/app/core/models/authentication/user';
import { EnvironmentService } from 'src/app/core/services/environment/environment-service';
import { AuthenticationService } from './authentication-service';
import { LoggingService } from 'src/app/core/services/logging/logging-service';
import { HttpErrorService } from 'src/app/core/services/http-error-handling/http-error-service';
import { API_PATHS } from 'src/app/core/routing/api-paths';

describe('AuthenticationService - Unit Tests', () => {
  let service: AuthenticationService;
  let controller: HttpTestingController;

  const API = 'http://localhost';
  const ERROR = new Error('Error message');
  const TEXT = 'Test message';

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
  const logoutPath = function (): string {
    return API + API_PATHS.auth.logout;
  };

  beforeEach(() => {
    const logging = jasmine.createSpyObj(LoggingService, [
      'logInfo',
      'logWarning',
      'logError',
    ]);
    const environment = jasmine.createSpyObj('EnvironmentService', [], {
      apiUrl: API,
    });
    const errorHandler = jasmine.createSpyObj(HttpErrorService, [
      'processError',
    ]);
    const transloco = jasmine.createSpyObj(TranslocoService, ['translate']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LoggingService, useValue: logging },
        { provide: EnvironmentService, useValue: environment },
        { provide: HttpErrorService, useValue: errorHandler },
        { provide: TranslocoService, useValue: transloco },
      ],
    });

    service = TestBed.inject(AuthenticationService);
    controller = TestBed.inject(HttpTestingController);

    errorHandler.processError.and.returnValue(ERROR);
    transloco.translate.and.returnValue(TEXT);
  });

  afterEach(() => {
    controller.verify();
  });

  it('U-Test-1: Service should return user object after successful login request', () => {
    service.postLogin(TestLoginDTO).subscribe({
      next: response => {
        expect(isIUser(response)).toBeTrue();
      },
    });

    const req = controller.expectOne(loginPath());
    req.flush(TestUser);
  });

  it('U-Test-2: Service should return error after login request if API returns faulty user object', () => {
    service.postLogin(TestLoginDTO).subscribe({
      error: error => {
        expect(error.message).toEqual(TEXT);
      },
    });

    const req = controller.expectOne(loginPath());
    req.flush({
      name: 'Name',
      email: 'email@gmx.com',
    });
  });

  it('U-Test-3: Service should return error after login request if API returns error response', () => {
    service.postLogin(TestLoginDTO).subscribe({
      error: error => {
        expect(error.message).toEqual(ERROR.message);
      },
    });

    const error = new HttpErrorResponse({ status: 423 });
    const req = controller.expectOne(loginPath());
    req.flush('Resource locked', error);
  });

  it('U-Test-4: Service should return user object after successful register request', () => {
    service.postRegister(TestRegisterDTO).subscribe({
      next: response => {
        expect(isIUser(response)).toBeTrue();
      },
    });

    const req = controller.expectOne(registerPath());
    req.flush(TestUser);
  });

  it('U-Test-5: Service should return error after register request if API returns faulty user object', () => {
    service.postRegister(TestRegisterDTO).subscribe({
      error: error => {
        expect(error.message).toEqual(TEXT);
      },
    });

    const req = controller.expectOne(registerPath());
    req.flush({
      name: 'Name',
      email: 'email@gmx.com',
    });
  });

  it('U-Test-6: Service should return error after register request if API returns error response', () => {
    service.postRegister(TestRegisterDTO).subscribe({
      error: error => {
        expect(error.message).toEqual(ERROR.message);
      },
    });

    const error = new HttpErrorResponse({ status: 423 });
    const req = controller.expectOne(registerPath());
    req.flush('Resource locked', error);
  });

  it('U-Test-7: Service should return nothing after successful forgotPwd request', () => {
    service.postForgotPwd(TestUser.email).subscribe({
      next: () => {
        expect(true).toBeTrue();
      },
    });

    const req = controller.expectOne(forgotPwdPath());
    req.flush(null);
  });

  it('U-Test-8: Service should return error after forgotPwd request if API returns error response', () => {
    service.postForgotPwd(TestUser.email).subscribe({
      error: error => {
        expect(error.message).toEqual(ERROR.message);
      },
    });

    const error = new HttpErrorResponse({ status: 423 });
    const req = controller.expectOne(forgotPwdPath());
    req.flush('Resource locked', error);
  });

  it('U-Test-9: Service should return nothing after successful access code request', () => {
    service.postAccessCode('12345').subscribe({
      next: () => {
        expect(true).toBeTrue();
      },
    });

    const req = controller.expectOne(resetPwdPath());
    req.flush(null);
  });

  it('U-Test-10: Service should return error after access code request if API returns error response', () => {
    service.postAccessCode('12345').subscribe({
      error: error => {
        expect(error.message).toEqual(ERROR.message);
      },
    });

    const error = new HttpErrorResponse({ status: 423 });
    const req = controller.expectOne(resetPwdPath());
    req.flush('Resource locked', error);
  });

  it('U-Test-11: Service should return nothing after successful logout request', () => {
    service.postLogout().subscribe({
      next: () => {
        expect(true).toBeTrue();
      },
    });

    const req = controller.expectOne(logoutPath());
    req.flush(null);
  });

  it('U-Test-12: Service should return error after logout request if API returns error response', () => {
    service.postLogout().subscribe({
      error: error => {
        expect(error.message).toEqual(ERROR.message);
      },
    });

    const error = new HttpErrorResponse({ status: 423 });
    const req = controller.expectOne(logoutPath());
    req.flush('Resource locked', error);
  });
});
