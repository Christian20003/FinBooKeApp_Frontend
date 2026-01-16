import { TestUser } from 'src/app/core';
import { selectSession, selectUser } from './User.selector';

describe('User-Store Selectors - Unit Tests', () => {
  it('U-Test-1: Should select the user object', () => {
    const result = selectUser.projector(TestUser);
    expect(result).toEqual(TestUser);
  });

  it('U-Test-2: Should select the session object', () => {
    const result = selectSession.projector(TestUser);
    expect(result).toEqual(TestUser.session);
  });
});
