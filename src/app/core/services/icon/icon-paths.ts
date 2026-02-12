import { ICON_NAMES } from './icon-names';

/**
 * The paths of all icons that can be registered.
 */
export const ICON_PATHS = {
  [ICON_NAMES.success]: 'assets/icons/action-results/success.svg',
  [ICON_NAMES.error]: 'assets/icons/action-results/error.svg',
  [ICON_NAMES.info]: 'assets/icons/action-results/info.svg',
  [ICON_NAMES.warning]: 'assets/icons/action-results/warning.svg',
  [ICON_NAMES.close]: 'assets/icons/actions/close.svg',
  [ICON_NAMES.loading]: 'assets/icons/symbols/coins.svg',
  [ICON_NAMES.username]: 'assets/icons/symbols/user.svg',
  [ICON_NAMES.email]: 'assets/icons/symbols/email.svg',
  [ICON_NAMES.password]: 'assets/icons/symbols/password.svg',
  [ICON_NAMES.dashboard]: 'assets/icons/symbols/dashboard.svg',
  [ICON_NAMES.finances]: 'assets/icons/symbols/finances.svg',
  [ICON_NAMES.profile]: 'assets/icons/symbols/profile.svg',
  [ICON_NAMES.settings]: 'assets/icons/symbols/settings.svg',
  [ICON_NAMES.logout]: 'assets/icons/symbols/logout.svg',
  [ICON_NAMES.logo]: 'assets/icons/symbols/logo.svg',
  [ICON_NAMES.light_theme]: 'assets/icons/actions/light-theme.svg',
  [ICON_NAMES.dark_theme]: 'assets/icons/actions/dark-theme.svg',
  [ICON_NAMES.german_flag]: 'assets/icons/flags/german.svg',
  [ICON_NAMES.britain_flag]: 'assets/icons/flags/british.svg',
} as const;
