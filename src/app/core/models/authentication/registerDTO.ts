/**
 * This interface represents the structure of the data which will be sent through the register event.
 *
 * @property {string} email The entered email address from the user.
 *  @property {string} name The entered username from the user.
 * @property {string} password The entered password from the user.
 */
export interface IRegisterDTO {
  email: string;
  name: string;
  password: string;
}

export const TestRegisterDTO: IRegisterDTO = {
  email: 'max-mustermann@gmail.com',
  name: 'max',
  password: '1234',
};
