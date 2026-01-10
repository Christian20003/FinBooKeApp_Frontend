/**
 * This interface represents a session which is needed to verify any interaction between this client and a server.
 *
 * @property {string} jwtToken The JWT token received by the server to be able for user verification.
 * @property {number} jwtExpire The time when the JWT token expires.
 * @property {string} refreshToken The refresh token received by the server to be able for refreshing JWT tokens.
 * @property {number} refreshExpire The time when the refresh token expires.
 */
export interface ISession {
  jwtToken: string;
  jwtExpire: number;
  refreshToken: string;
  refreshExpire: number;
}

/** Example object for a session (usable for testing) */
export const TestSession: ISession = {
  jwtToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
  jwtExpire: Date.now() + 600000,
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
  refreshExpire: Date.now() + 800000,
};
