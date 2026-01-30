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
