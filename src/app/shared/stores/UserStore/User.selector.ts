import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../models/User';

const selectState = createFeatureSelector<User>('user');
export const selectUser = createSelector(selectState, (user: User) => user);
export const selectSession = createSelector(
  selectState,
  (user: User) => user.session
);
