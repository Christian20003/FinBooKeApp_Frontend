import { ISession, TestSession } from './session';

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

/** Example object for a user (usable for testing) */
export const TestUser: IUser = {
  name: 'Max',
  email: 'max.mustermann@gmail.com',
  imagePath:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Olaf_Scholz_2024.jpg/220px-Olaf_Scholz_2024.jpg',
  session: TestSession,
};
