import { Injectable, inject } from '@angular/core';
import { EnvironmentService } from 'src/app/core/services/environment/environment-service';
import { LogType } from './log-type';

/**
 * This service provides methods to log certain process steps / data.
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private readonly environment = inject(EnvironmentService);

  /**
   * This method allows to create an `info` log message if logging is enabled.
   * @param message  The message which should be printed.
   * @param optionalParams A list of values which should be printed as well.
   */
  public logInfo(message: string, ...optionalParams: unknown[]): void {
    this.log(message, 'info', optionalParams);
  }

  /**
   * This method allows to create a `warning` log message if logging is enabled.
   * @param message The message which should be printed.
   * @param optionalParams A list of values which should be printed as well.
   */
  public logWarning(message: string, ...optionalParams: unknown[]): void {
    this.log(message, 'warning', optionalParams);
  }

  /**
   * This method allows to create an `error` log message if logging is enabled.
   * @param message The message which should be printed.
   * @param optionalParams A list of values which should be printed as well.
   */
  public logError(message: string, ...optionalParams: unknown[]): void {
    this.log(message, 'error', optionalParams);
  }

  /**
   * This method prints the provided message and parameters to the console
   * with the corresponding console function depending on the {@link LogType}.
   * @param message The message which should be printed.
   * @param type The type of the log message.
   * @param optionalParams A list of values which should be printed as well.
   */
  private log(
    message: string,
    type: LogType,
    ...optionalParams: unknown[]
  ): void {
    if (this.environment.enableLogging) {
      const date = new Date();
      const output = `[${date.toLocaleTimeString()}]: ${message} \t`;
      switch (type) {
        case 'info':
          console.info(output, optionalParams);
          break;
        case 'warning':
          console.warn(output, optionalParams);
          break;
        case 'error':
          console.error(output, optionalParams);
          break;
        default:
          console.debug(output, optionalParams);
          break;
      }
    }
  }
}
