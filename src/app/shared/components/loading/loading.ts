import { Component, input, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';
import { ICON_NAMES, IconService } from 'src/app/core/';
import { TRANSLATION_KEYS } from 'src/app/shared/localization/translation-keys';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.html',
  styleUrls: ['./loading.scss'],
  imports: [TranslocoDirective, MatIcon],
})
export class LoadingComponent {
  // Dependency to register SVG icon
  private readonly iconService = inject(IconService);
  // The icon names
  protected readonly iconNames = ICON_NAMES;
  // Keys for translated text
  protected readonly translationKeys = TRANSLATION_KEYS;
  // The message which should be displayed.
  readonly message = input<string>('');

  constructor() {
    this.iconService.registerIcon(this.iconNames.loading);
  }
}
