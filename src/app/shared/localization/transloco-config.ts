import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';

/**
 * Configuration for the Transloco localization library.
 */
export const translocoConfig = {
  config: {
    availableLangs: ['en', 'de'],
    defaultLang: 'en',
    reRenderOnLangChange: true,
    prodMode: !isDevMode(),
  },
  loader: TranslocoHttpLoader,
};
