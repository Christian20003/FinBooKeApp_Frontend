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
    username: {
      label: 'auth.username.label',
      missing: 'auth.username.missing',
    },
    password: {
      label: 'auth.password.label',
      missing: 'auth.password.missing',
      lowerCase: 'auth.password.lowerCase',
      upperCase: 'auth.password.upperCase',
      digit: 'auth.password.digit',
      chars: 'auth.password.chars',
      length: 'auth.password.length',
    },
    code: {
      missing: 'auth.code.missing',
    },
  },
  navbar: {
    dashboard: 'navbar.dashboard',
    finances: 'navbar.finances',
    profile: 'navbar.profile',
    settings: 'navbar.settings',
    logout: 'navbar.logout',
  },
  language: {
    english: 'language.english',
    german: 'language.german',
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
