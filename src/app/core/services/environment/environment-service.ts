import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * This service allows access to environment variables.
 */
@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  /**
   * This method returns the environment variable if
   * this application runs in development mode.
   */
  get production() {
    return environment.production;
  }

  /**
   * This method returns the environment variable of
   * the API-URL.
   */
  get apiUrl() {
    return environment.apiUrl;
  }

  /**
   * This method returns the environment variable if
   * logging should be enabled.
   */
  get enableLogging() {
    return environment.enableLogging;
  }
}
