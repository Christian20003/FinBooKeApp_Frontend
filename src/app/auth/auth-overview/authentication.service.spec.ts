import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { TestUser, User } from 'src/app/shared';
import { EnvironmentService } from 'src/app/dev-tools/environment.service';
import { getTranslocoModule } from 'src/app/testing/transloco-testing.module';
import { AuthenticationService } from './authentication.service';
import { TestLoginData } from '../models/loginData';
import { TestRegisterData } from '../models/registerData';
import { TestSecurityCode } from '../models/securityCode';

describe('AuthenticationService - Unit Tests', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;
  let envService: EnvironmentService;
  const loggingServie = jasmine.createSpyObj('LoggingService', [
    'logInfo',
    'logError',
  ]);
  const api = 'http://testing';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        EnvironmentService,
        { provide: loggingServie, useValue: loggingServie },
      ],
    });
    service = TestBed.inject(AuthenticationService);
    envService = TestBed.inject(EnvironmentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  /*-----------------------------------------------Successful-Requests-----------------------------------------------------------*/

  it('U-Test-1: should be created', () => {
    expect(service)
      .withContext('AuthenticationService should exist')
      .toBeTruthy();
  });

  it('U-Test-2: A successful login request', () => {
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(api);
    service.postLogin(TestLoginData).subscribe({
      next: response => {
        const user = response as User;
        expect(user.name)
          .withContext('Responding user object should have a name')
          .toBeTruthy();
        expect(user.id)
          .withContext('Responding user object should have an id')
          .toBeTruthy();
        expect(user.imagePath)
          .withContext('Responding user object should have an imagePath')
          .toBeTruthy();
        expect(user.session)
          .withContext('Responding user object should have a session object')
          .toBeTruthy();
        expect(user.email)
          .withContext('Responding user object should have an email')
          .toBeTruthy();
      },
    });
    // @ts-expect-error Getting the relativ path
    const path = api + service.LOGIN_PATH;
    const req = httpTestingController.expectOne(path);
    expect(req.request.method)
      .withContext('POST request should be executed')
      .toBe('POST');
    req.flush(TestUser);
  });

  it('U-Test-3: A successful register request', () => {
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(api);
    service.postRegister(TestRegisterData).subscribe({
      next: response => {
        const user = response as User;
        expect(user.name)
          .withContext('Responding user object should have a name')
          .toBeTruthy();
        expect(user.id)
          .withContext('Responding user object should have an id')
          .toBeTruthy();
        expect(user.imagePath)
          .withContext('Responding user object should have an imagePath')
          .toBeTruthy();
        expect(user.session)
          .withContext('Responding user object should have a session object')
          .toBeTruthy();
        expect(user.email)
          .withContext('Responding user object should have an email')
          .toBeTruthy();
      },
    });
    // @ts-expect-error Getting the relativ path
    const path = api + service.REGISTER_PATH;
    const req = httpTestingController.expectOne(path);
    expect(req.request.method)
      .withContext('POST request should be executed')
      .toBe('POST');
    req.flush(TestUser);
  });

  it('U-Test-4: A successful postEmail request', () => {
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(api);
    service.postEmail(TestUser.email).subscribe({
      next: response => {
        expect(response)
          .withContext('Success response should exist')
          .toBeTruthy();
      },
    });
    // @ts-expect-error Getting the relativ path
    const path = api + service.CODE_PATH;
    const req = httpTestingController.expectOne(path);
    expect(req.request.method)
      .withContext('POST request should be executed')
      .toBe('POST');
    req.flush('Success');
  });

  it('U-Test-5: A successful postCode request', () => {
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(api);
    service.postCode(TestSecurityCode).subscribe({
      next: response => {
        expect(response)
          .withContext('Success response should exist')
          .toBeTruthy();
      },
    });
    // @ts-expect-error Getting the relativ path
    const path = api + service.CODE_PATH;
    const req = httpTestingController.expectOne(path);
    expect(req.request.method)
      .withContext('PUT request should be executed')
      .toBe('PUT');
    req.flush('Success');
  });

  it('U-Test-6: A successful logout request', () => {
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(api);
    service.deleteLogin().subscribe({
      next: response => {
        expect(response)
          .withContext('Success response should exist')
          .toBeTruthy();
      },
    });
    // @ts-expect-error Getting the relativ path
    const path = api + service.LOGIN_PATH;
    const req = httpTestingController.expectOne(path);
    expect(req.request.method)
      .withContext('DELETE request should be executed')
      .toBe('DELETE');
    req.flush('Success');
  });

  /*-----------------------------------------------Unsuccessful-Requests----------------------------------------------------------*/

  it('U-Test-7: A faulty login request', () => {
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(api);
    service.postLogin(TestLoginData).subscribe({
      error: error => {
        expect(error)
          .withContext('Error object should be present')
          .toBeTruthy();
        expect(error.message)
          .withContext('Erros object should have a message')
          .not.toEqual('');
      },
    });
    // @ts-expect-error Getting the relativ path
    const path = api + service.LOGIN_PATH;
    const req = httpTestingController.expectOne(path);
    const error = new HttpErrorResponse({ status: 406 });
    expect(req.request.method)
      .withContext('POST request should be executed')
      .toBe('POST');
    req.flush('Invalid credentials', error);
  });

  it('U-Test-8: A faulty register request', () => {
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(api);
    service.postRegister(TestRegisterData).subscribe({
      error: error => {
        expect(error)
          .withContext('Error object should be present')
          .toBeTruthy();
        expect(error.message)
          .withContext('Erros object should have a message')
          .not.toEqual('');
      },
    });
    // @ts-expect-error Getting the relativ path
    const path = api + service.REGISTER_PATH;
    const req = httpTestingController.expectOne(path);
    const error = new HttpErrorResponse({ status: 404 });
    expect(req.request.method)
      .withContext('POST request should be executed')
      .toBe('POST');
    req.flush('Resource not found', error);
  });

  it('U-Test-9: A faulty postEmail request', () => {
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(api);
    service.postEmail(TestUser.email).subscribe({
      error: error => {
        expect(error)
          .withContext('Error object should be present')
          .toBeTruthy();
        expect(error.message)
          .withContext('Erros object should have a message')
          .not.toEqual('');
      },
    });
    // @ts-expect-error Getting the relativ path
    const path = api + service.CODE_PATH;
    const req = httpTestingController.expectOne(path);
    const error = new HttpErrorResponse({ status: 444 });
    expect(req.request.method)
      .withContext('POST request should be executed')
      .toBe('POST');
    req.flush('Unknown problem', error);
  });

  it('U-Test-10: A faulty postCode request', () => {
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(api);
    service.postCode(TestSecurityCode).subscribe({
      error: error => {
        expect(error)
          .withContext('Error object should be present')
          .toBeTruthy();
        expect(error.message)
          .withContext('Erros object should have a message')
          .not.toEqual('');
      },
    });
    // @ts-expect-error Getting the relativ path
    const path = api + service.CODE_PATH;
    const req = httpTestingController.expectOne(path);
    const error = new HttpErrorResponse({ status: 500 });
    expect(req.request.method)
      .withContext('PUT request should be executed')
      .toBe('PUT');
    req.flush('Server error', error);
  });

  it('U-Test-11: A faulty logout request', () => {
    spyOnProperty(envService, 'apiUrl', 'get').and.returnValue(api);
    service.deleteLogin().subscribe({
      error: error => {
        expect(error)
          .withContext('Error object should be present')
          .toBeTruthy();
        expect(error.message)
          .withContext('Erros object should have a message')
          .not.toEqual('');
      },
    });
    // @ts-expect-error Getting the relativ path
    const path = api + service.LOGIN_PATH;
    const req = httpTestingController.expectOne(path);
    const error = new HttpErrorResponse({ status: 500 });
    expect(req.request.method)
      .withContext('DELETE request should be executed')
      .toBe('DELETE');
    req.flush('Server error', error);
  });
});
