import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';

export const config = {
  config: {
    availableLangs: ['en', 'de'],
    defaultLang: 'en',
    reRenderOnLangChange: true,
    prodMode: !isDevMode(),
  },
  loader: TranslocoHttpLoader,
};
