import { createReducer, on } from '@ngrx/store';
import {
  deleteUser,
  setEmail,
  setUser,
  setUserImagePath,
  setUserName,
  setUserSession,
} from './User.actions';
import { User } from '../../models/User';

/** This object represents the initial state of a user in the store */
export const initialState: User = {
  id: 0,
  name: '',
  email: '',
  imagePath: '',
  session: {
    token: '',
    expire: 0,
  },
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (_, action): User => action.user),
  on(
    setUserName,
    (state, action): User => ({
      ...state,
      name: action.name,
    })
  ),
  on(
    setEmail,
    (state, action): User => ({
      ...state,
      email: action.email,
    })
  ),
  on(
    setUserImagePath,
    (state, action): User => ({
      ...state,
      imagePath: action.imagePath,
    })
  ),
  on(
    setUserSession,
    (state, action): User => ({
      ...state,
      session: action.session,
    })
  ),
  on(deleteUser, (): User => initialState)
);
