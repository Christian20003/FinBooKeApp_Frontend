import { TestSession } from './session.spec';
import { IUser } from './user';

/**
 * `IUser` object for testing
 */
export const TestUser: IUser = {
  name: 'Max',
  email: 'max.mustermann@gmail.com',
  imagePath:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Olaf_Scholz_2024.jpg/220px-Olaf_Scholz_2024.jpg',
  session: TestSession,
};
