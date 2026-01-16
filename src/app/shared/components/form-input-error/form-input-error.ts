import { Component, input, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ICON_NAMES, IconService } from 'src/app/core';

/**
 * This component represents an error message for form inputs.
 */
@Component({
  selector: 'app-form-input-error',
  templateUrl: './form-input-error.html',
  styleUrls: ['./form-input-error.scss'],
  imports: [MatIcon],
})
export class FormInputError {
  private readonly iconService = inject(IconService);
  protected readonly iconNames = ICON_NAMES;
  readonly message = input.required<string>();

  constructor() {
    this.iconService.registerIcon(this.iconNames.warning);
  }
}
