import { createReducer, on } from '@ngrx/store';
import {
  deleteUser,
  setEmail,
  setUser,
  setUserImagePath,
  setUserName,
  setUserSession,
} from './User.actions';
import { IUser } from 'src/app/core';

/** This object represents the initial state of a user in the store */
export const initialState: IUser = {
  name: '',
  email: '',
  imagePath: '',
  session: {
    jwtToken: '',
    jwtExpire: 0,
    refreshToken: '',
    refreshExpire: 0,
  },
};

export const userReducer = createReducer(
  initialState,
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
  on(deleteUser, (): IUser => initialState)
);
