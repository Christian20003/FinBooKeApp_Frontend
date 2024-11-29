import { TestUser } from '../../models/User';
import { selectSession, selectUser } from './User.selector';

describe('User-Store Selectors - Unit Tests', () => {
  it('U-Test-1: Should select the user object', () => {
    const result = selectUser.projector(TestUser);
    expect(result.name).toBe(TestUser.name);
    expect(result.session.token).toBe(TestUser.session.token);
  });

  it('U-Test-2: Should select the session object', () => {
    const result = selectSession.projector(TestUser);
    expect(result.token).toBe(TestUser.session.token);
    expect(result.expire).toBe(TestUser.session.expire);
  });
});
