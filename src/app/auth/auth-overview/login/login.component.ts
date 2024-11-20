import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { moveLeftToRight } from 'src/app/shared/index';
import { loginData } from '../../auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveLeftToRight],
  standalone: false,
})
export class LoginComponent implements OnInit {
  //EventEmitter to sent the entered login data to the parent component.
  @Output() login = new EventEmitter<loginData>();
  // EventEmitter to signal the parent component that the user forgot his password.
  @Output() forgetPwd = new EventEmitter();

  // The reactive login form
  loginForm!: FormGroup;

  // All text values which are used in this component.
  text = {
    email: {
      label: 'Email-Adresse',
      missing: 'Bitte eine Email-Adresse angeben',
      invalid: 'Ungültige Email-Adresse',
    },
    password: {
      label: 'Passwort',
      missing: 'Bitte ein Passwort eingeben',
    },
    login: 'Anmelden',
    errorMsg: 'Es ist leider ein unerwarteter Fehler aufgetreten',
    forgetPwd: 'Passwort vergessen?',
  };

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  /**
   * This function returns the email value of the corresponding element in the form.
   * @returns The control object of email from the form
   */
  get email(): AbstractControl<string, string> | null {
    return this.loginForm.get('email');
  }

  /**
   * This function returns the password value of the corresponding element in the form.
   * @returns The control object of password from the form
   */
  get password(): AbstractControl<string, string> | null {
    return this.loginForm.get('password');
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
   * This function emits ann event to the parent component that the user has clicked the 'forget-pwd' <a> element.
   */
  onForgetPassword(): void {
    this.forgetPwd.emit();
  }
}
