import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUser } from 'src/app/core';

const selectState = createFeatureSelector<IUser>('user');

/** This selector allows to select the user object from the store. */
export const selectUser = createSelector(selectState, (user: IUser) => user);

/** This selector allows to select the session object from the store. */
export const selectSession = createSelector(
  selectState,
  (user: IUser) => user.session
);
