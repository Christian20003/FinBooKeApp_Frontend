import { Component, output, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { FormInputError, TRANSLATION_KEYS } from 'src/app/shared/index';
import { TranslocoDirective } from '@jsverse/transloco';
import { ICON_NAMES, IconService, ILoginDTO } from 'src/app/core';

/**
 * Component for the login view.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [FormInputError, MatIcon, TranslocoDirective, ReactiveFormsModule],
})
export class Login {
  private readonly iconService = inject(IconService);

  protected readonly iconNames = ICON_NAMES;
  protected readonly translationKeys = TRANSLATION_KEYS;

  readonly login = output<ILoginDTO>();
  readonly forgotPwd = output<void>();

  // The login form
  protected readonly form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  constructor() {
    this.iconService.registerIcons([
      this.iconNames.email,
      this.iconNames.password,
    ]);
  }

  /**
   * This function returns the email value of the corresponding element in the form.
   *
   * @returns The control object of email from the form
   */
  protected get email(): AbstractControl<string, string> | null {
    return this.form.get('email');
  }

  /**
   * This function returns the password value of the corresponding element in the form.
   *
   * @returns The control object of password from the form
   */
  protected get password(): AbstractControl<string, string> | null {
    return this.form.get('password');
  }

  /**
   * This function emits an event to the parent component with the entered data in the form. If one of the elements are not
   * valid the event will not be emitted and the user will be noticed with some error messages.
   */
  protected onSubmit(): void {
    if (this.email?.valid && this.password?.valid) {
      this.login.emit({
        email: this.email.value,
        password: this.password.value,
      });
    }
    this.email?.markAsTouched();
    this.password?.markAsTouched();
    if (!this.email?.valid && !this.email?.errors?.['email']) {
      this.email?.setErrors({ required: true });
    }
    if (!this.password?.valid) {
      this.password?.setErrors({ required: true });
    }
  }

  /**
   * This function emits an event to the parent component that the user has clicked the 'forget-pwd' element.
   */
  protected onForgetPassword(): void {
    this.forgotPwd.emit();
  }
}
