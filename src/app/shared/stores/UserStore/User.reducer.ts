import { createReducer, on } from '@ngrx/store';
import {
  deleteUser,
  setEmail,
  setUser,
  setUserImagePath,
  setUserName,
  setUserSession,
} from './User.actions';
import { IUser, IUserUnauthenticated } from 'src/app/core';

/**
 * Reducer function to manage user state in the store.
 */
export const userReducer = createReducer(
  IUserUnauthenticated,
  on(setUser, (_, action): IUser => action.user),
  on(
    setUserName,
    (state, action): IUser => ({
      ...state,
      name: action.name,
    })
  ),
  on(
    setEmail,
    (state, action): IUser => ({
      ...state,
      email: action.email,
    })
  ),
  on(
    setUserImagePath,
    (state, action): IUser => ({
      ...state,
      imagePath: action.imagePath,
    })
  ),
  on(
    setUserSession,
    (state, action): IUser => ({
      ...state,
      session: action.session,
    })
  ),
  on(deleteUser, (): IUser => IUserUnauthenticated)
);
