import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { includeAuthUrl } from 'src/app/core/routing/api-paths';
import { IUser } from '../models';

/**
 * This function should intercept all non authentication requests sent to the backend of this application.
 * It will append the authentication token into the request header.
 * @param request   The request object sent to the backend of this application.
 * @param next      see {@link HttpHandlerFn}.
 * @returns         The updated request object.
 */
export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const obj = localStorage.getItem('user');
  if (includeAuthUrl(request.url) || obj === null) {
    return next(request);
  }
  const user: IUser = JSON.parse(obj);
  const newRequest = request.clone({
    headers: request.headers.append(
      'Authorization',
      `Bearer: ${user.session.jwtToken}`
    ),
  });
  return next(newRequest);
}
