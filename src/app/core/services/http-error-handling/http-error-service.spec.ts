import { TranslocoService } from '@jsverse/transloco';
import { HttpErrorService } from './http-error-service';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { LoggerService } from '../logging/logging-service';
import {
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { TRANSLATION_KEYS } from 'src/app/shared';

describe('HttpErrorService - Unit Test', () => {
  let service: HttpErrorService;
  let transloco: jasmine.SpyObj<TranslocoService>;

  function getResponse(code: number): HttpErrorResponse {
    return {
      name: 'HttpErrorResponse',
      status: code,
      statusText: 'Internal Server Error',
      message: 'An unexpected error occurred',
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
      error: { message: 'Server error details' },
      ok: false,
      type: HttpEventType.ResponseHeader,
      url: 'https://api.example.com/endpoint',
    };
  }

  beforeEach(() => {
    const logging = jasmine.createSpyObj(LoggerService, ['logError']);
    transloco = jasmine.createSpyObj(TranslocoService, ['translate']);
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: TranslocoService, useValue: transloco },
        { provide: LoggerService, useValue: logging },
      ],
    });
    service = TestBed.inject(HttpErrorService);
  });

  it('U-Test-1: Service should return correct error if http error code is 400', () => {
    const response = getResponse(400);

    const result = service.processError(response);

    expect(result.message).toBe(response.message);
  });

  it('U-Test-2: Service should return correct error if http error code is 403', () => {
    const response = getResponse(403);

    service.processError(response);

    expect(transloco.translate).toHaveBeenCalledWith(
      TRANSLATION_KEYS.httpError.unauthorized
    );
  });

  it('U-Test-3: Service should return correct error if http error code is 404', () => {
    const response = getResponse(404);

    service.processError(response);

    expect(transloco.translate).toHaveBeenCalledWith(
      TRANSLATION_KEYS.httpError.notFound
    );
  });

  it('U-Test-4: Service should return correct error if http error code is 406', () => {
    const response = getResponse(406);

    service.processError(response);

    expect(transloco.translate).toHaveBeenCalledWith(
      TRANSLATION_KEYS.httpError.credentials
    );
  });

  it('U-Test-5: Service should return correct error if http error code is 423', () => {
    const response = getResponse(423);

    service.processError(response);

    expect(transloco.translate).toHaveBeenCalledWith(
      TRANSLATION_KEYS.httpError.locked
    );
  });

  it('U-Test-6: Service should return correct error if http error code is 503', () => {
    const response = getResponse(503);

    service.processError(response);

    expect(transloco.translate).toHaveBeenCalledWith(
      TRANSLATION_KEYS.httpError.unavailable
    );
  });

  it('U-Test-7: Service should return correct error if http error code is 500', () => {
    const response = getResponse(500);

    service.processError(response);

    expect(transloco.translate).toHaveBeenCalledWith(
      TRANSLATION_KEYS.httpError.serverError
    );
  });

  it('U-Test-8: Service should return correct error if http error code is not specified', () => {
    const response = getResponse(666);

    service.processError(response);

    expect(transloco.translate).toHaveBeenCalledWith(
      TRANSLATION_KEYS.httpError.serverError
    );
  });
});
