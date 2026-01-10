import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { EnvironmentService } from 'src/app/core/services/environment/environment-service';
import { LoggerService } from 'src/app/core/services/logging/logging-service';
import { ILoginDTO } from 'src/app/core/models/authentication/loginDTO';
import { IRegisterDTO } from 'src/app/core/models/authentication/registerDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  private transloco = inject(TranslocoService);
  private logger = inject(LoggerService);
  private envService = inject(EnvironmentService);

  private readonly LOGIN_PATH: string = '/login';
  private readonly REGISTER_PATH: string = '/register';
  private readonly CODE_PATH: string = '/login/code';

  /**
   * This function makes a POST request via HTTP to try a login with the given data. If the request was successfull it will return an
   * observable with a {@link User} object, otherwise it will return an observable with an {@link Error} object, inlcuding a corresponding
   * message.
   *
   * @param data      - The login data as a {@link loginData} object.
   * @returns           An observable either with a {@link User} object after success or an {@link Error} object after failure.
   */
  postLogin(data: ILoginDTO): Observable<User | Error> {
    const path = this.envService.apiUrl + this.LOGIN_PATH;
    this.logger.logInfo('POST to ' + path, data);
    return this.http.post<User>(path, data).pipe(
      map(response => {
        if (
          response.name &&
          response.email &&
          response.id &&
          response.session
        ) {
          this.logger.logInfo('Success of POST to ' + path, response);
          return response;
        }
        this.logger.logError('Error of POST to ' + path, response);
        return new Error(this.transloco.translate('http-error.invalid'));
      }),
      catchError(this.errorHandling.bind(this))
    );
  }

  /**
   * This function makes a POST request via HTTP to try a registration with the given data. If the request was successfull it will return an
   * observable with a {@link User} object, otherwise it will return an observable with an {@link Error} object, inlcuding a corresponding
   * message.
   *
   * @param data      - The registration data as a {@link registerData} object.
   * @returns           An observable either with a {@link User} object after success or an {@link Error} object after failure.
   */
  postRegister(data: IRegisterDTO): Observable<User | Error> {
    const path = this.envService.apiUrl + this.REGISTER_PATH;
    this.logger.logInfo('POST to ' + path, data);
    return this.http.post<User>(path, data).pipe(
      map(response => {
        if (
          response.name &&
          response.email &&
          response.id &&
          response.session
        ) {
          this.logger.logInfo('Success of POST to ' + path, response);
          return response;
        }
        this.logger.logError('Error of POST to ' + path, response);
        return new Error(this.transloco.translate('http-error.invalid'));
      }),
      catchError(this.errorHandling.bind(this))
    );
  }

  /**
   * This function makes a POST request via HTTP to send a security code to the given email address. If the request was successfull it will return an
   * observable with a string message, otherwise it will return an observable with an {@link Error} object, inlcuding a corresponding
   * message.
   *
   * @param email       - The email address to which the security code should be sent.
   * @returns           An observable either with a string message after success or an {@link Error} object after failure.
   */
  postEmail(email: string): Observable<string | Error> {
    const path = this.envService.apiUrl + this.CODE_PATH;
    this.logger.logInfo('POST to ' + path, email);
    return this.http.post<string>(path, email).pipe(
      map(response => {
        this.logger.logInfo('Success of POST to ' + path, response);
        return response;
      }),
      catchError(this.errorHandling.bind(this))
    );
  }

  /**
   * This function makes a PUT request via HTTP to sent the entered security code for validation. If the request was successfull it will return an
   * observable with a string message, otherwise it will return an observable with an {@link Error} object, inlcuding a corresponding
   * message.
   *
   * @param data      - The code data as a {@link securityCode} object.
   * @returns           An observable either with a string message after success or an {@link Error} object after failure.
   */
  postCode(data: string): Observable<string | Error> {
    const path = this.envService.apiUrl + this.CODE_PATH;
    this.logger.logInfo('PUT to ' + path, data);
    return this.http.put<string>(path, data).pipe(
      map(response => {
        this.logger.logInfo('Success of PUT to ' + path, response);
        return response;
      }),
      catchError(this.errorHandling.bind(this))
    );
  }

  /**
   * This function makes a DELETE request via HTTP to try a logout from the account. If the request was successfull it will return an
   * observable with a string message, otherwise it will return an observable with an {@link Error} object, inlcuding a corresponding
   * message.
   *
   * @returns           An observable either with a string message after success or an {@link Error} object after failure.
   */
  deleteLogin(): Observable<string | Error> {
    const path = this.envService.apiUrl + this.LOGIN_PATH;
    this.logger.logInfo('DELETE to ' + path);
    return this.http.delete<string>(path).pipe(
      map(response => {
        this.logger.logInfo('Success of DELETE to ' + path, response);
        return response;
      }),
      catchError(this.errorHandling.bind(this))
    );
  }

  /**
   * This function is responsible for error handling in a http request. If the result of that request is an error, this function
   * should be called to create a proper error object (Observable) with a corresponding message.
   *
   * @param error   - The error object which has been catched from the http request.
   * @returns         A new observable with an error object, including a corresponding error message.
   */
  private errorHandling(error: HttpErrorResponse): Observable<Error> {
    this.logger.logError('Error of request', error);
    switch (error.status) {
      case 404:
        return throwError(() => {
          return new Error(this.transloco.translate('http-error.not-found'));
        });
      case 406:
        return throwError(() => {
          return new Error(this.transloco.translate('http-error.credentials'));
        });
      case 409:
        return throwError(() => {
          return new Error(this.transloco.translate('http-error.user-name'));
        });
      case 500:
        return throwError(() => {
          return new Error(this.transloco.translate('http-error.unavailable'));
        });
      case 503:
        return throwError(() => {
          return new Error(this.transloco.translate('http-error.server-error'));
        });
      default:
        return throwError(() => {
          return new Error(this.transloco.translate('http-error.server-error'));
        });
    }
  }
}
