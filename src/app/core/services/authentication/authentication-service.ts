import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, catchError, map } from 'rxjs';
import { EnvironmentService } from 'src/app/core/services/environment/environment-service';
import { LoggingService } from 'src/app/core/services/logging/logging-service';
import {
  IUser,
  ILoginDTO,
  IRegisterDTO,
  ISession,
  isIUser,
  isISession,
  IReauthenticationDTO,
} from 'src/app/core/models/';
import { API_PATHS, buildApiUrl } from 'src/app/core/routing/api-paths';
import { TRANSLATION_KEYS } from 'src/app/shared';
import { HttpErrorService } from 'src/app/core/services/http-error-handling/http-error-service';

/**
 * This service provides methods for authentication with an API.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly client = inject(HttpClient);
  private readonly errorHandler = inject(HttpErrorService);
  private readonly transloco = inject(TranslocoService);
  private readonly logger = inject(LoggingService);
  private readonly environment = inject(EnvironmentService);

  /**
   * Builds the full API URL by combining the base URL with the endpoint.
   *
   * @param endpoint The API endpoint path.
   * @returns The full URL.
   */
  private getPath(endpoint: string): string {
    return buildApiUrl(this.environment.apiUrl, endpoint);
  }

  /**
   * This method makes a login request via HTTP to the API.
   *
   * @param data The login data.
   * @returns An observable with a user object.
   */
  postLogin(data: ILoginDTO): Observable<IUser> {
    const path = this.getPath(API_PATHS.auth.login);
    this.logger.logInfo(`POST to ${path}`, data);

    return this.client.post<IUser>(path, data).pipe(
      map(response => {
        if (isIUser(response)) {
          this.logger.logInfo(`Success of POST to ${path}`, response);
          return response;
        }
        this.logger.logError(`Error of POST to ${path}`, response);
        const message = this.transloco.translate(
          TRANSLATION_KEYS.httpError.invalid
        );
        throw new Error(message);
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          throw this.errorHandler.processError(error);
        }
        throw error;
      })
    );
  }

  /**
   * This method makes a register request via HTTP to to the API.
   *
   * @param data The registration data.
   * @returns An observable with a user object.
   */
  postRegister(data: IRegisterDTO): Observable<IUser> {
    const path = this.getPath(API_PATHS.auth.register);
    this.logger.logInfo(`POST to ${path}`, data);

    return this.client.post<IUser>(path, data).pipe(
      map(response => {
        if (isIUser(response)) {
          this.logger.logInfo(`Success of POST to ${path}`, response);
          return response;
        }
        this.logger.logError(`Error of POST to ${path}`, response);
        const message = this.transloco.translate(
          TRANSLATION_KEYS.httpError.invalid
        );
        throw new Error(message);
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          throw this.errorHandler.processError(error);
        }
        throw error;
      })
    );
  }

  /**
   * This method makes a forgot password request via HTTP to the API. Thereby
   * the user will receive an access code by email.
   *
   * @param email The email address to which the access code should be sent.
   * @returns An observable without any object.
   */
  postForgotPwd(email: string): Observable<void> {
    const path = this.getPath(API_PATHS.auth.forgotPwd);
    this.logger.logInfo(`POST to ${path}`, email);

    return this.client.post<void>(path, email).pipe(
      map(response => {
        this.logger.logInfo(`Success of POST to ${path}`, response);
      }),
      catchError(error => {
        throw this.errorHandler.processError(error);
      })
    );
  }

  // TODO: This must be changed for better security
  /**
   * This method makes a access code request via HTTP to the API. Thereby
   * the user will receive a new password by email.
   *
   * @param data The access code.
   * @returnsAn observable without any object.
   */
  postAccessCode(data: string): Observable<void> {
    const path = this.getPath(API_PATHS.auth.resetPwd);
    this.logger.logInfo(`POST to ${path}`, data);

    return this.client.post<void>(path, data).pipe(
      map(response => {
        this.logger.logInfo(`Success of POST to ${path}`, response);
      }),
      catchError(error => {
        throw this.errorHandler.processError(error);
      })
    );
  }

  /**
   * This method makes a logout request via HTTP to the API.
   *
   * @returns An observable without any object.
   */
  postLogout(): Observable<void> {
    const path = this.getPath(API_PATHS.auth.logout);
    this.logger.logInfo(`POST to ${path}`);

    return this.client.post<void>(path, null).pipe(
      map(response => {
        this.logger.logInfo(`Success of DELETE to ${path}`, response);
      }),
      catchError(error => {
        throw this.errorHandler.processError(error);
      })
    );
  }

  /**
   * This method makes a refresh access token request via HTTP to the API.
   *
   * @param data The refresh token data to authenticate the user.
   * @returns An observable with the received session object.
   */
  postRefreshToken(data: IReauthenticationDTO): Observable<ISession> {
    const path = this.getPath(API_PATHS.auth.refreshToken);
    this.logger.logInfo(`POST to ${path}`);

    return this.client.post<ISession>(path, data).pipe(
      map(response => {
        if (isISession(response)) {
          this.logger.logInfo(`Success of POST to ${path}`, response);
          return response;
        }
        this.logger.logError(`Error of POST to ${path}`, response);
        const message = this.transloco.translate(
          TRANSLATION_KEYS.httpError.invalid
        );
        throw new Error(message);
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          throw this.errorHandler.processError(error);
        }
        throw error;
      })
    );
  }
}
