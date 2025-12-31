import { Component, input, InputSignal, inject } from '@angular/core';
import { MatIconRegistry, MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-invalid-input',
  templateUrl: './invalid-input.component.html',
  styleUrls: ['./invalid-input.component.scss'],
  imports: [MatIcon],
})
export class InvalidInputComponent {
  private iconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  public message: InputSignal<string> = input.required();

  constructor() {
    this.iconRegistry.addSvgIcon(
      'warning',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icons/warning.svg'
      )
    );
  }
}
