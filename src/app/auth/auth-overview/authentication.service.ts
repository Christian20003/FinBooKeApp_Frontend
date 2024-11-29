import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/index';
import { securityCode, loginData, registerData } from '../auth.interface';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly LOGIN_PATH: string = 'https://backend/login';
  private readonly REGISTER_PATH: string = 'https://backend/register';
  private readonly CODE_PATH: string = 'https://backend/login/code';

  private static readonly errorMsg = {
    invalidStructure: 'Etwas ist mit der erhaltenen Antwort schief gelaufen',
    invalidCredentials: 'Die eingegebenen Daten sind ungültig',
    assignedName: 'Der angegebene Benutzername ist bereits vergeben',
    notFound: 'Es konnte keine Verbindung hergestellt werden',
    serverError: 'Es kam zu einem serverseitigen Fehler',
    unavailable: 'Der Service ist aktuell nicht verfügbar',
    unknown: 'Es ist ein unerwarteter Fehler eingetreten',
  };

  constructor(private http: HttpClient) {}

  /**
   * This function makes a POST request via HTTP to try a login with the given data. If the request was successfull it will return an
   * observable with a {@link User} object, otherwise it will return an observable with an {@link Error} object, inlcuding a corresponding
   * message.
   *
   * @param data      - The login data as a {@link loginData} object.
   * @returns           An observable either with a {@link User} object after success or an {@link Error} object after failure.
   */
  postLogin(data: loginData): Observable<User | Error> {
    return this.http.post<User>(this.LOGIN_PATH, data).pipe(
      map(response => {
        if (
          response.name &&
          response.email &&
          response.id &&
          response.session
        ) {
          return response;
        }
        console.error(
          'Something went wrong with the structure of the response during login'
        );
        return new Error(AuthenticationService.errorMsg.invalidStructure);
      }),
      catchError(this.errorHandling)
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
  postRegister(data: registerData): Observable<User | Error> {
    return this.http.post<User>(this.REGISTER_PATH, data).pipe(
      map(response => {
        if (
          response.name &&
          response.email &&
          response.id &&
          response.session
        ) {
          return response;
        }
        console.error(
          'Something went wrong with the structure of the response during registration'
        );
        return new Error(AuthenticationService.errorMsg.invalidStructure);
      }),
      catchError(this.errorHandling)
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
    return this.http
      .post<string>(this.CODE_PATH, email)
      .pipe(catchError(this.errorHandling));
  }

  /**
   * This function makes a PUT request via HTTP to sent the entered security code for validation. If the request was successfull it will return an
   * observable with a string message, otherwise it will return an observable with an {@link Error} object, inlcuding a corresponding
   * message.
   *
   * @param data      - The code data as a {@link securityCode} object.
   * @returns           An observable either with a string message after success or an {@link Error} object after failure.
   */
  postCode(data: securityCode): Observable<string | Error> {
    return this.http
      .put<string>(this.CODE_PATH, data)
      .pipe(catchError(this.errorHandling));
  }

  /**
   * This function makes a DELETE request via HTTP to try a logout from the account. If the request was successfull it will return an
   * observable with a string message, otherwise it will return an observable with an {@link Error} object, inlcuding a corresponding
   * message.
   *
   * @returns           An observable either with a string message after success or an {@link Error} object after failure.
   */
  deleteLogin(): Observable<string | Error> {
    return this.http
      .delete<string>(this.LOGIN_PATH)
      .pipe(catchError(this.errorHandling));
  }

  /**
   * This function is responsible for error handling in a http request. If the result of that request is an error, this function
   * should be called to create a proper error object (Observable) with a corresponding message.
   *
   * @param error   - The error object which has been catched from the http request.
   * @returns         A new observable with an error object, including a corresponding error message.
   */
  private errorHandling(error: HttpErrorResponse): Observable<Error> {
    switch (error.status) {
      case 404:
        return throwError(() => {
          return new Error(AuthenticationService.errorMsg.notFound);
        });
      case 406:
        return throwError(() => {
          return new Error(AuthenticationService.errorMsg.invalidCredentials);
        });
      case 409:
        return throwError(() => {
          return new Error(AuthenticationService.errorMsg.assignedName);
        });
      case 500:
        return throwError(() => {
          return new Error(AuthenticationService.errorMsg.serverError);
        });
      case 503:
        return throwError(() => {
          return new Error(AuthenticationService.errorMsg.unavailable);
        });
      default:
        return throwError(() => {
          return new Error(AuthenticationService.errorMsg.unknown);
        });
    }
  }
}
