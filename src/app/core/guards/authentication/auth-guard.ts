import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectSession } from 'src/app/shared';
import { PATHS } from 'src/app/core/routing/paths';

/**
 * This function is an authentication route guard.
 * It will redirect to the login path, if the user is
 * not authenticated.
 *
 * @returns `true` if the user is authenticated, otherwise
 * a `UrlTree` to the login path.
 */
export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectSession).pipe(
    map(session => {
      const now = new Date();
      if (session.jwtExpire < now.getTime()) {
        return router.createUrlTree([PATHS.login]);
      }
      return true;
    })
  );
};
