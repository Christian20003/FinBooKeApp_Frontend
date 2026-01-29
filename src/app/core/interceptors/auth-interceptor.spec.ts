import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthInterceptor } from './auth-interceptor';
import { TestUser } from 'src/app/core/index.spec';
import { IUser } from 'src/app/core/models';
import { API_PATHS } from 'src/app/core/routing/api-paths';

describe('AuthInterceptor: Unit Tests', () => {
  let client: HttpClient;
  let controller: HttpTestingController;

  const setStorage = function (value: IUser | null): void {
    spyOn(Object.getPrototypeOf(localStorage), 'getItem').and.callFake(() => {
      return JSON.stringify(value);
    });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([AuthInterceptor])),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    });
    client = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('U-Test-1: Interceptor should add a authorization header to the request', () => {
    setStorage(TestUser);

    client.get('/test').subscribe();
    const req = controller.expectOne('/test');

    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer: ${TestUser.session.jwtToken}`
    );
  });

  it('U-Test-2: Interceptor should not add authorization header to request if authentication path is included', () => {
    setStorage(TestUser);

    client.get(API_PATHS.auth.login).subscribe();
    const req = controller.expectOne(API_PATHS.auth.login);

    expect(req.request.headers.has('Authorization')).toBeFalsy();
  });

  it('U-Test-3: Interceptor should not add authorization header to request if token does not exist', () => {
    setStorage(null);

    client.get('/test').subscribe();
    const req = controller.expectOne('/test');

    expect(req.request.headers.has('Authorization')).toBeFalsy();
  });
});
