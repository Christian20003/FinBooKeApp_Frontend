import { Component, output, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {
  FormInputErrorComponent,
  TRANSLATION_KEYS,
} from 'src/app/shared/index';
import { TranslocoDirective } from '@jsverse/transloco';
import { ICON_NAMES, IconService } from 'src/app/core';
import { ILoginDTO } from 'src/app/core/models/authentication/loginDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [
    FormInputErrorComponent,
    MatIcon,
    TranslocoDirective,
    ReactiveFormsModule,
  ],
})
export class LoginComponent {
  // Dependency to register icons
  private readonly iconService = inject(IconService);
  protected readonly iconNames = ICON_NAMES;
  // Keys for translated text
  protected readonly translationKeys = TRANSLATION_KEYS;
  // Signal to send login data
  readonly login = output<ILoginDTO>();
  // Signal if forgot password link has been clicked
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
   * @returns The control object of email from the form
   */
  protected get email(): AbstractControl<string, string> | null {
    return this.form.get('email');
  }

  /**
   * This function returns the password value of the corresponding element in the form.
   * @returns The control object of password from the form
   */
  protected get password(): AbstractControl<string, string> | null {
    return this.form.get('password');
  }

  /**
   * This function emits an event to the parent component with the entered data in the form. If one of the elements are not
   * valid the event will not be emitted and the user will be noticed with some error messages.
   */
  onSubmit(): void {
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
  onForgetPassword(): void {
    this.forgotPwd.emit();
  }
}
