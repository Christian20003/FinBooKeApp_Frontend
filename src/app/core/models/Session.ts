/**
 * This interface represents a session which is needed to verify any interaction between this client and a server.
 *
 * @property {string} token - The token received by the server to be able for user verification.
 * @property {number} expire - The time in seconds after which this token expires.
 */
export interface Session {
  token: string;
  expire: number;
}

/** Example object for a session (usable for testing) */
export const TestSession: Session = {
  token: '402880824ff933a4014ff9345d7c0002',
  expire: 7200,
};
