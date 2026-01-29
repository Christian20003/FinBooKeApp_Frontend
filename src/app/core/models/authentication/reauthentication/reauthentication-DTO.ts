/**
 * This interface represents the message structure sent to the API
 * to refresh the access token.
 *
 * @property {string} refreshToken The refresh token to be authenticated.
 * @property {number} refreshExpire The time when the refresh token has expired.
 */
export interface IReauthenticationDTO {
  refreshToken: string;
  refreshExpire: number;
}
