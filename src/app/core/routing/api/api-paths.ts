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
