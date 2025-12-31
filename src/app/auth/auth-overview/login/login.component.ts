import {
  Component,
  OnInit,
  output,
  OutputEmitterRef,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconRegistry, MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { moveLeftToRight, InvalidInputComponent } from 'src/app/shared/index';
import { LoginData } from '../../models/loginData';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveLeftToRight],
  imports: [
    InvalidInputComponent,
    MatIcon,
    TranslocoDirective,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  //Output signal to sent the entered login data to the parent component.
  public login: OutputEmitterRef<LoginData> = output();
  // Output signal to signal the parent component that the user forgot his password.
  public forgetPwd: OutputEmitterRef<void> = output();

  // The reactive login form
  loginForm!: FormGroup;

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'password',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/password.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'email',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/email.svg'
      )
    );
  }

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
