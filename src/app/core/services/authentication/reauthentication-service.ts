import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs';
import { AuthenticationService } from './authentication-service';
import { ToastService } from 'src/app/core/services/toast/toast-service';
import { selectSession, setUserSession } from 'src/app/shared';
import { wait } from 'src/app/core/helper/wait';
import {
  IUserUnauthenticated,
  ToastLifeTime,
  ToastType,
  ISession,
} from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class ReauthenticationService {
  private readonly authentication = inject(AuthenticationService);
  private readonly toast = inject(ToastService);
  private readonly store = inject(Store);

  private update = false;

  /**
   * This method return the session object from the user
   * data in the store.
   */
  private get session(): ISession {
    let result = IUserUnauthenticated.session;
    this.store.pipe(select(selectSession), take(1)).subscribe(session => {
      result = session;
    });
    return result;
  }

  /**
   * This method stops the reauthentication process in the
   * `start` method.
   */
  stop(): void {
    this.update = false;
  }

  /**
   * This method updates the access token for API authentication after its expiration date.
   * Consider the following:
   * - This method can only be activated once.
   * - Do not wait for this function as it creates an endless loop.
   * - To stop the procedure call the `stop` method.
   * - If the user is unanthenticated this process will stop.
   */
  async start(): Promise<void> {
    // Ensures that function runs only once.
    if (this.update) return;
    this.update = true;
    const init = JSON.stringify(IUserUnauthenticated.session);
    // Refresh access tokens as long as possible
    while (this.update) {
      const session = this.session;
      // Check if session object is valid
      if (JSON.stringify(session) === init) {
        this.update = false;
        break;
      }
      // Wait until access token expires soon
      const date = new Date();
      const expire = session.jwtExpire - 30000 - date.getTime();
      await wait(expire, true);
      if (!this.update) break;

      // Request new access token
      const request = this.authentication.postRefreshToken({
        refreshToken: session.refreshToken,
        refreshExpire: session.refreshExpire,
      });

      // Process request result
      request.subscribe({
        next: response => {
          if (this.update) {
            this.store.dispatch(setUserSession({ session: response }));
          }
        },
        error: error => {
          this.toast.addToast(
            error.message,
            ToastType.ERROR,
            ToastLifeTime.LONG
          );
        },
      });
    }
  }
}
