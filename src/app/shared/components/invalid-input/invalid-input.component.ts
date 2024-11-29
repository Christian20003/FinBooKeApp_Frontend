import { Component, input, InputSignal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-invalid-input',
  templateUrl: './invalid-input.component.html',
  styleUrls: ['./invalid-input.component.scss'],
  standalone: false,
})
export class InvalidInputComponent {
  public message: InputSignal<string> = input.required();

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'warning',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/warning.svg'
      )
    );
  }
}
