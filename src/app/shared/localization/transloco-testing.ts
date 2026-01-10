import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@jsverse/transloco';
import en from 'src/assets/i18n/en.json';
import de from 'src/assets/i18n/de.json';

/**
 * Returns a TranslocoTestingModule instance for testing purposes.
 * @param options Configuration options for the testing module.
 * @returns A TranslocoTestingModule instance.
 */
export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en, de },
    translocoConfig: {
      availableLangs: ['en', 'es'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
