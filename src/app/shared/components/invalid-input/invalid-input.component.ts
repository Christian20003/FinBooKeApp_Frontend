import { Component, input, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IconService } from '../../services/icon/icon.service';

@Component({
  selector: 'app-invalid-input',
  templateUrl: './invalid-input.component.html',
  styleUrls: ['./invalid-input.component.scss'],
  imports: [MatIcon],
})
export class InvalidInputComponent {
  // Service to register required SVG icon
  private readonly iconService = inject(IconService);
  // Name of the icon
  protected readonly iconName = 'warning';
  // Message that should be displayed
  readonly message = input.required<string>();

  constructor() {
    this.iconService.registerIcon(this.iconName);
  }
}
