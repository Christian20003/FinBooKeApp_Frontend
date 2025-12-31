import { provideTransloco, TranslocoModule } from '@jsverse/transloco';
import { isDevMode, NgModule } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';

export const config = {
  config: {
    availableLangs: ['en', 'de'],
    defaultLang: 'en',
    // Remove this option if your application doesn't support changing language in runtime.
    reRenderOnLangChange: true,
    prodMode: !isDevMode(),
  },
  loader: TranslocoHttpLoader,
};

@NgModule({
  exports: [TranslocoModule],
  providers: [provideTransloco(config)],
})
export class TranslocoRootModule {}
