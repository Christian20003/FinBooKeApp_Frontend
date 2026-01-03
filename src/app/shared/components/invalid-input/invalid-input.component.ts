import { Component, input, inject } from '@angular/core';
import { MatIconRegistry, MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-invalid-input',
  templateUrl: './invalid-input.component.html',
  styleUrls: ['./invalid-input.component.scss'],
  imports: [MatIcon],
})
export class InvalidInputComponent {
  // Dependency to register icons
  private readonly iconRegistry = inject(MatIconRegistry);
  // Dependency to access SVG resource
  private readonly domSanitizer = inject(DomSanitizer);
  // Message that should be displayed
  readonly message = input.required<string>();

  constructor() {
    this.iconRegistry.addSvgIcon(
      'warning',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/warning.svg'
      )
    );
  }
}
