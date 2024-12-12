/**
 * This interface represents the structure of the data which will be sent through the login event.
 *
 * @property {string} email - The entered email address from the user
 * @property {string} password - The entered password from the user
 */
export interface LoginData {
  email: string;
  password: string;
}

export const TestLoginData: LoginData = {
  email: 'max-mustermann@gmail.com',
  password: '1234',
};
