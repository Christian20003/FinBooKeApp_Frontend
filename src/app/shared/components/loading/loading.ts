import { Component, input, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';
import { ICON_NAMES, IconService } from 'src/app/core/';
import { TRANSLATION_KEYS } from 'src/app/shared/localization/translation-keys';

/**
 * This component represents a loading screen with an optional message.
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.html',
  styleUrls: ['./loading.scss'],
  imports: [TranslocoDirective, MatIcon],
})
export class LoadingComponent {
  private readonly iconService = inject(IconService);
  protected readonly iconNames = ICON_NAMES;
  protected readonly translationKeys = TRANSLATION_KEYS;
  readonly message = input<string>('');

  constructor() {
    this.iconService.registerIcon(this.iconNames.loading);
  }
}
