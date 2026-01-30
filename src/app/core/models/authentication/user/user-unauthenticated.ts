import { IUser } from './user';

/**
 * `IUser` object when the user is unauthenticated.
 */
export const IUserUnauthenticated: IUser = {
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
