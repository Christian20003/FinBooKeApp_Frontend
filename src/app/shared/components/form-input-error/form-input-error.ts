import { Component, input, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ICON_NAMES, IconService } from 'src/app/core';

@Component({
  selector: 'app-form-input-error',
  templateUrl: './form-input-error.html',
  styleUrls: ['./form-input-error.scss'],
  imports: [MatIcon],
})
export class FormInputErrorComponent {
  // Service to register required SVG icon
  private readonly iconService = inject(IconService);
  // Names of the icons
  protected readonly iconNames = ICON_NAMES;
  // Message that should be displayed
  readonly message = input.required<string>();

  constructor() {
    this.iconService.registerIcon(this.iconNames.warning);
  }
}
