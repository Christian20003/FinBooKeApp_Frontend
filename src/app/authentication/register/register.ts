import { Component, inject, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {
  ICON_NAMES,
  IconService,
  IRegisterDTO,
  passwordStrengthValidator,
} from 'src/app/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { FormInputError, TRANSLATION_KEYS } from 'src/app/shared';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [MatIcon, ReactiveFormsModule, TranslocoDirective, FormInputError],
})
export class Register {
  private readonly iconService = inject(IconService);

  protected readonly iconNames = ICON_NAMES;
  protected readonly translationKeys = TRANSLATION_KEYS;
  protected readonly form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      nonNullable: true,
    }),
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        passwordStrengthValidator(5),
      ],
      nonNullable: true,
    }),
  });

  readonly register = output<IRegisterDTO>();

  constructor() {
    this.iconService.registerIcons([
      this.iconNames.email,
      this.iconNames.username,
      this.iconNames.password,
    ]);
  }

  /**
   * This method returns the form control element reponsible
   * for tracking the email value.
   */
  protected get email(): AbstractControl<string, string> {
    return this.form.get('email')!;
  }

  /**
   * This method returns the form control element responsible
   * for tracking the username value.
   */
  protected get username(): AbstractControl<string, string> {
    return this.form.get('username')!;
  }

  /**
   * This method returns the form control element responsible
   * for tracking the password value.
   */
  protected get password(): AbstractControl<string, string> {
    return this.form.get('password')!;
  }

  /**
   * This method executes the form submission. If the
   * form is valid it emitts the content to the parent
   * component, otherwise error messages will be activated.
   */
  protected onSubmit(): void {
    const email = this.email;
    const username = this.username;
    const password = this.password;
    if (email.valid && username.valid && password.valid) {
      this.register.emit({
        email: email.value,
        name: username.value,
        password: password.value,
      });
    } else {
      this.markField(email);
      this.markField(username);
    }
  }

  /**
   * This method activates the `required` error of
   * a specified form control element, if not any
   * error is detected.
   *
   * @param field The form control element.
   */
  private markField(field: AbstractControl<string, string>): void {
    field.markAllAsTouched();

    if (!field.valid && field.value === '') {
      field.setErrors({ required: true });
    }
  }
}
