import { API_PATHS } from './api-paths';

/**
 * This function proofs if a given URL includes
 * authentication endpoints.
 *
 * @param path The URL that should be checked.
 * @returns `true` if the URL includes an authentication
 * endpoint, otherwise `false`.
 */
export function includeAuthUrl(url: string): boolean {
  return (
    url.includes(API_PATHS.auth.login) ||
    url.includes(API_PATHS.auth.register) ||
    url.includes(API_PATHS.auth.forgotPwd) ||
    url.includes(API_PATHS.auth.resetPwd) ||
    url.includes(API_PATHS.auth.logout) ||
    url.includes(API_PATHS.auth.refreshToken)
  );
}
