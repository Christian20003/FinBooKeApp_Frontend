import { Component, input, OnInit, output, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';
import { ICON_NAMES, IconService } from 'src/app/core';
import { FormInputErrorComponent, TRANSLATION_KEYS } from 'src/app/shared';

/**
 * This component provides a form for users to request an access code by entering their email address.
 * It includes input validation and error handling to ensure a valid email is provided.
 */
@Component({
  selector: 'app-request-access-code',
  templateUrl: './request-access-code.html',
  styleUrls: ['./request-access-code.scss'],
  imports: [
    MatIcon,
    FormInputErrorComponent,
    TranslocoDirective,
    ReactiveFormsModule,
  ],
})
export class RequestAccessCodeComponent implements OnInit {
  private readonly iconService = inject(IconService);

  protected readonly translationKeys = TRANSLATION_KEYS;
  protected readonly iconNames = ICON_NAMES;
  protected form!: FormGroup;

  readonly email = input<string>('');
  readonly send = output<string>();

  constructor() {
    this.iconService.registerIcon(this.iconNames.email);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.email(), [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  /**
   * This function returns the email value of the corresponding element in the form.
   *
   * @returns The control object of email from the form.
   */
  protected get field(): AbstractControl<string, string> | null {
    return this.form.get('email');
  }
  /**
   * This function send the entered email address to the parent component. If the email is not valid
   * then the event will not be triggered. But the user will be notified with a specific error message.
   */
  onSubmit() {
    if (this.field?.valid) {
      this.send.emit(this.field.value);
    }

    this.field?.markAsTouched();
    if (this.field?.invalid && !this.field.errors?.['email']) {
      this.field.setErrors({ required: true });
    }
  }
}
