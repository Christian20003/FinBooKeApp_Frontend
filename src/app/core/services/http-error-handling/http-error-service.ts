import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { LoggingService } from 'src/app/core/services/logging/logging-service';
import { TRANSLATION_KEYS } from 'src/app/shared';

/**
 * This service provide a method for handling HTTP errors.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  private readonly transloco = inject(TranslocoService);
  private readonly logger = inject(LoggingService);

  /**
   * This method process http errors.
   *
   * @param error The error object which has been catched from the http request.
   * @returns An error object, including a corresponding error message.
   */
  processError(error: HttpErrorResponse): Error {
    this.logger.logError('Http error response catched', error);
    switch (error.status) {
      // Details for 400 can only be determined by the API
      case 400:
        return new Error(error.message);
      case 403:
        return new Error(
          this.transloco.translate(TRANSLATION_KEYS.httpError.unauthorized)
        );
      case 404:
        return new Error(
          this.transloco.translate(TRANSLATION_KEYS.httpError.notFound)
        );
      case 406:
        return new Error(
          this.transloco.translate(TRANSLATION_KEYS.httpError.credentials)
        );
      case 423:
        return new Error(
          this.transloco.translate(TRANSLATION_KEYS.httpError.locked)
        );
      case 503:
        return new Error(
          this.transloco.translate(TRANSLATION_KEYS.httpError.unavailable)
        );
      default:
      case 500:
        return new Error(
          this.transloco.translate(TRANSLATION_KEYS.httpError.serverError)
        );
    }
  }
}
