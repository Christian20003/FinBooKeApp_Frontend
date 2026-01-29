/**
 * All API relative paths without domain and port.
 */
export const API_PATHS = {
  auth: {
    login: '/login',
    register: '/register',
    forgotPwd: '/forgotPwd',
    resetPwd: '/resetPwd',
    logout: '/logout',
    refreshToken: '/refreshToken',
  },
} as const;

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

/**
 * This function builds the full API URL by combining the API-URL with the endpoint.
 * @param api The API-URL.
 * @param endpoint The endpoint path.
 * @returns The full URL.
 */
export function buildApiUrl(api: string, endpoint: string): string {
  return `${api}${endpoint}`;
}
