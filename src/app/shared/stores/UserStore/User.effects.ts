import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap, tap } from 'rxjs';
import {
  deleteUser,
  loadUserSession,
  setUser,
  setUserSession,
} from './User.actions';
import { selectUser } from './User.selector';
import { initialState } from './User.reducer';
import { concatLatestFrom } from '@ngrx/operators';

@Injectable()
export class userEffects {
  // Save the user object on local storage after initialization
  saveUserData$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(setUser, setUserSession),
        concatLatestFrom(() => this.store.select(selectUser)),
        tap(([, value]) => {
          localStorage.setItem('user', JSON.stringify(value));
        })
      );
    },
    { dispatch: false }
  );

  // Load the last saved user object from local storage
  loadUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUserSession),
      switchMap(() => {
        const userObj = localStorage.getItem('user');
        if (userObj) {
          return of(setUser({ user: JSON.parse(userObj) }));
        }
        // If no object was found, create new default object
        return of(setUser({ user: initialState }));
      })
    );
  });

  // Delete the user data from local storage
  deleteUserData = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteUser),
        tap(() => {
          localStorage.removeItem('user');
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
}
