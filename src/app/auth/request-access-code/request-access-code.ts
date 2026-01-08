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
import { IconService } from 'src/app/core';
import { FormInputErrorComponent } from 'src/app/shared';

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
  // Dependency to register SVG icon
  private readonly iconSerive = inject(IconService);
  // Name of the SVG icon
  readonly iconName = 'email';
  // The email address
  readonly email = input<string>('');
  // The output signal to emit entered email address
  readonly send = output<string>();
  // Form to be able to enter an email address
  protected form!: FormGroup;

  constructor() {
    this.iconSerive.registerIcon(this.iconName);
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
   * @returns The control object of email from the form.
   */
  get field(): AbstractControl<string, string> | null {
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
