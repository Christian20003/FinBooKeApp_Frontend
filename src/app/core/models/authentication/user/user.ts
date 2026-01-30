import { ISession } from './session';

/**
 * This class represents a user profile with all necessary information.
 *
 * @property {string} name The profile name of the user.
 * @property {string} email The email address of the user.
 * @property {string} imagePath The URL of the profile image.
 * @property {Session} session The session object for verification.
 */
export interface IUser {
  name: string;
  email: string;
  imagePath: string;
  session: ISession;
}
