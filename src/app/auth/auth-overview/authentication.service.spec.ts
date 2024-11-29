import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { User } from 'src/app/shared';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';

describe('AuthenticationService - Unit Tests', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;
  const dummyUser = {
    id: 2,
    name: 'max',
    email: 'max.mustermann@moon.com',
    password: '123',
    imagePath: 'https://backend/test',
    session: {
      token: 'abcde',
      expire: 1000,
    },
  };
  const requestPaths = {
    login: 'https://backend/login',
    register: 'https://backend/register',
    code: 'https://backend/login/code',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  /*-----------------------------------------------Successful-Requests-----------------------------------------------------------*/

  it('U-Test-1: should be created', () => {
    expect(service).toBeTruthy();
  });

  it('U-Test-2: A successful login request', () => {
    const data = {
      email: dummyUser.email,
      password: dummyUser.password,
    };

    service.postLogin(data).subscribe({
      next: response => {
        const user = response as User;
        expect(user.name).toBeTruthy();
        expect(user.id).toBeTruthy();
        expect(user.imagePath).toBeTruthy();
        expect(user.session).toBeTruthy();
        expect(user.email).toBeTruthy();
      },
    });

    const req = httpTestingController.expectOne(requestPaths.login);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  it('U-Test-3: A successful register request', () => {
    const data = {
      email: dummyUser.email,
      name: dummyUser.name,
      password: dummyUser.password,
    };

    service.postRegister(data).subscribe({
      next: response => {
        const user = response as User;
        expect(user.name).toBeTruthy();
        expect(user.id).toBeTruthy();
        expect(user.imagePath).toBeTruthy();
        expect(user.session).toBeTruthy();
        expect(user.email).toBeTruthy();
      },
    });

    const req = httpTestingController.expectOne(requestPaths.register);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  it('U-Test-4: A successful postEmail request', () => {
    service.postEmail(dummyUser.email).subscribe({
      next: response => {
        expect(response).toBeTruthy();
      },
    });

    const req = httpTestingController.expectOne(requestPaths.code);
    expect(req.request.method).toBe('POST');
    req.flush('Success');
  });

  it('U-Test-5: A successful postCode request', () => {
    const data = {
      value1: 1,
      value2: 2,
      value3: 3,
      value4: 4,
      value5: 5,
      value6: 6,
    };

    service.postCode(data).subscribe({
      next: response => {
        expect(response).toBeTruthy();
      },
    });

    const req = httpTestingController.expectOne(requestPaths.code);
    expect(req.request.method).toBe('PUT');
    req.flush('Success');
  });

  it('U-Test-6: A successful logout request', () => {
    service.deleteLogin().subscribe({
      next: response => {
        expect(response).toBeTruthy();
      },
    });

    const req = httpTestingController.expectOne(requestPaths.login);
    expect(req.request.method).toBe('DELETE');
    req.flush('Success');
  });

  /*-----------------------------------------------Unsuccessful-Requests----------------------------------------------------------*/

  it('U-Test-7: A faulty login request', () => {
    const data = {
      email: dummyUser.email,
      password: dummyUser.password,
    };

    service.postLogin(data).subscribe({
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).not.toEqual('');
      },
    });

    const req = httpTestingController.expectOne(requestPaths.login);
    const error = new HttpErrorResponse({ status: 406 });
    expect(req.request.method).toBe('POST');
    req.flush('Invalid credentials', error);
  });

  it('U-Test-8: A faulty register request', () => {
    const data = {
      email: dummyUser.email,
      name: dummyUser.name,
      password: dummyUser.password,
    };

    service.postRegister(data).subscribe({
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).not.toEqual('');
      },
    });

    const req = httpTestingController.expectOne(requestPaths.register);
    const error = new HttpErrorResponse({ status: 404 });
    expect(req.request.method).toBe('POST');
    req.flush('Resource not found', error);
  });

  it('U-Test-9: A faulty postEmail request', () => {
    service.postEmail(dummyUser.email).subscribe({
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).not.toEqual('');
      },
    });

    const req = httpTestingController.expectOne(requestPaths.code);
    const error = new HttpErrorResponse({ status: 444 });
    expect(req.request.method).toBe('POST');
    req.flush('Unknown problem', error);
  });

  it('U-Test-10: A faulty postCode request', () => {
    const data = {
      value1: 1,
      value2: 2,
      value3: 3,
      value4: 4,
      value5: 5,
      value6: 6,
    };

    service.postCode(data).subscribe({
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).not.toEqual('');
      },
    });

    const req = httpTestingController.expectOne(requestPaths.code);
    const error = new HttpErrorResponse({ status: 500 });
    expect(req.request.method).toBe('PUT');
    req.flush('Server error', error);
  });

  it('U-Test-11: A faulty logout request', () => {
    service.deleteLogin().subscribe({
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).not.toEqual('');
      },
    });

    const req = httpTestingController.expectOne(requestPaths.login);
    const error = new HttpErrorResponse({ status: 500 });
    expect(req.request.method).toBe('DELETE');
    req.flush('Server error', error);
  });
});
