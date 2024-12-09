import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';

enum LogTypes {
  INFO,
  WARNING,
  ERROR,
}
/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private envService: EnvironmentService) {}

  /**
   * This method allows to create an `info` log message if logging is enabled.
   * @param message           The message which should be printed.
   * @param optionalParams    A list of values which should be printed as well.
   */
  public logInfo(message: string, ...optionalParams: any[]): void {
    this.log(message, LogTypes.INFO, optionalParams);
  }

  /**
   * This method allows to create a `warning` log message if logging is enabled.
   * @param message           The message which should be printed.
   * @param optionalParams    A list of values which should be printed as well.
   */
  public logWarning(message: string, ...optionalParams: any[]): void {
    this.log(message, LogTypes.WARNING, optionalParams);
  }

  /**
   * This method allows to create an `error` log message if logging is enabled.
   * @param message           The message which should be printed.
   * @param optionalParams    A list of values which should be printed as well.
   */
  public logError(message: string, ...optionalParams: any[]): void {
    this.log(message, LogTypes.ERROR, optionalParams);
  }

  /**
   * This method prints the provided message and parameters to the console
   * with the corresponding console function depending on the {@link LogTypes}.
   * @param message           The message which should be printed.
   * @param type              The type of the log message.
   * @param optionalParams    A list of values which should be printed as well.
   */
  private log(message: string, type: LogTypes, ...optionalParams: any[]): void {
    if (this.envService.enableLogging) {
      const date = new Date();
      const output = '[' + date.toLocaleTimeString() + ']: ' + message + '\t';
      switch (type) {
        case LogTypes.INFO:
          console.info(output, optionalParams);
          break;
        case LogTypes.WARNING:
          console.warn(message, optionalParams);
          break;
        case LogTypes.ERROR:
          console.error(message, optionalParams);
          break;
        default:
          console.debug(message, optionalParams);
          break;
      }
    }
  }
}
