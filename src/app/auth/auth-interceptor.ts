import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Session, User } from '../shared';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginPath } from './auth-routing-module';
import {
  deleteUser,
  setUserSession,
} from '../shared/stores/UserStore/User.actions';

/**
 * This function should intercept all requests sent to the backend of this application. It will append the authentication token
 * and the expired value into the request header (it will read the values from {@link localStorage}). Furthermore the response of the
 * request will be analysed if an ```401 (Unauthorized)``` error occurs. In that case this intercept will redirect the user to the
 * ```login``` path and delete the {@link User} object from the {@link Store} and {@link localStorage}. Otherwise the possible updated
 * token data of the reponse is extracted and sent to the {@link Store} and {@link localStorage}.
 * @param request   The request object sent to the backend of this application
 * @param next      see {@link HttpHandlerFn}
 * @returns         The updated request object
 */
export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const obj = localStorage.getItem('user');
  const router = inject(Router);
  const store = inject(Store);
  let newReq = request;
  if (obj) {
    const user: User = JSON.parse(obj);
    newReq = request.clone({
      headers: request.headers
        .append('Authentication-Token', user.session.token)
        .append('Authentication-Time', user.session.expire.toString()),
    });
  }
  return next(newReq).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        if (event.status === 401) {
          router.navigate([loginPath]);
          store.dispatch(deleteUser());
        } else {
          const token = event.headers.get('Authentication-Token');
          const expire = event.headers.get('Authentication-Time');
          if (token && expire) {
            const session: Session = {
              token: token,
              expire: +expire,
            };
            store.dispatch(setUserSession({ session: session }));
          }
        }
      }
    })
  );
}
