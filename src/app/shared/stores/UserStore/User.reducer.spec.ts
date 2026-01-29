import { TestUser } from 'src/app/core/index.spec';
import {
  deleteUser,
  setEmail,
  setUser,
  setUserImagePath,
  setUserName,
  setUserSession,
} from './User.actions';
import { userReducer } from './User.reducer';
import { IUserUnauthenticated } from 'src/app/core';

describe('User-Store Reducer - Unit Tests', () => {
  it('U-Test-1: setUser should set the value of the store', () => {
    const action = setUser({ user: TestUser });
    let state = userReducer(IUserUnauthenticated, action);

    expect(state).toEqual(TestUser);
    expect(state).not.toBe(IUserUnauthenticated);
    state = IUserUnauthenticated;
  });

  it('U-Test-2: setUserName should set the name attribut', () => {
    const action = setUserName({ name: TestUser.name });
    const state = userReducer(IUserUnauthenticated, action);

    expect(state.name).toBe(TestUser.name);
  });

  it('U-Test-3: setUserImagePath should set the imagePath attribut', () => {
    const action = setUserImagePath({ imagePath: TestUser.imagePath });
    const state = userReducer(IUserUnauthenticated, action);

    expect(state.imagePath).toBe(TestUser.imagePath);
  });

  it('U-Test-4: setEmail should set the email attribut', () => {
    const action = setEmail({ email: TestUser.email });
    const state = userReducer(IUserUnauthenticated, action);

    expect(state.email).toBe(TestUser.email);
  });

  it('U-Test-5: setUserSession should set the session attribut', () => {
    const action = setUserSession({ session: TestUser.session });
    const state = userReducer(IUserUnauthenticated, action);

    expect(state.session).toBe(TestUser.session);
  });

  it('U-Test-6: deleteUser should set the user object to default', () => {
    const actionSet = setUser({ user: TestUser });
    const stateFill = userReducer(IUserUnauthenticated, actionSet);

    const actionDelete = deleteUser();
    const stateDefault = userReducer(stateFill, actionDelete);

    expect(stateDefault).toBe(IUserUnauthenticated);
  });

  it('U-Test-7: should ignore an unkown action', () => {
    const action = { type: 'Unknown' };
    const state = userReducer(IUserUnauthenticated, action);

    expect(state).toBe(IUserUnauthenticated);
  });
});
