/**
 * Translation keys used throughout the application for localization.
 */
export const TRANSLATION_KEYS = {
  title: 'title',
  auth: {
    actions: {
      login: 'auth.actions.login',
      register: 'auth.actions.register',
      forgotPwd: 'auth.actions.forgotPwd',
      sendCode: 'auth.actions.sendCode',
    },
    email: {
      label: 'auth.email.label',
      missing: 'auth.email.missing',
      invalid: 'auth.email.invalid',
    },
    password: {
      label: 'auth.password.label',
      missing: 'auth.password.missing',
    },
    code: {
      missing: 'auth.code.missing',
    },
  },
  navbar: {
    dashboard: 'navbar.dashboard',
    finances: 'navbar.finances',
    accounts: 'navbar.accounts',
    profile: 'navbar.profile',
    settings: 'navbar.settings',
    logout: 'navbar.logout',
  },
  loadingScreen: {
    header: 'loading-screen.header',
    send: 'loading-screen.send',
    read: 'loading-screen.read',
  },
  httpError: {
    invalid: 'http-error.invalid',
    credentials: 'http-error.credentials',
    locked: 'http-error.locked',
    unauthorized: 'http-error.unautherized',
    notFound: 'http-error.not-found',
    unavailable: 'http-error.unavailable',
    serverError: 'http-error.server-error',
  },
} as const;
