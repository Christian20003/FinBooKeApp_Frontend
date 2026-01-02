import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  setUser,
  moveLeftToRight,
  moveRightToLeft,
  User,
  ToastTypes,
  ToastRemoveType,
  LoadingComponent,
} from 'src/app/shared/index';
import { ToastService } from 'src/app/shared/components/toasts/toast.service';
import { AuthenticationService } from './authentication.service';
import {
  loginPath,
  registerPath,
  resetPasswordPath,
} from '../auth-routing-module';
import { LoginData } from '../models/loginData';
import { RegisterData } from '../models/registerData';
import { SetCodeComponent } from './set-code/set-code.component';
import { GetCodeComponent } from './get-code/get-code.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-auth-overview',
  templateUrl: './auth-overview.component.html',
  styleUrls: ['./auth-overview.component.scss'],
  animations: [moveLeftToRight, moveRightToLeft],
  imports: [
    SetCodeComponent,
    GetCodeComponent,
    LoginComponent,
    RegisterComponent,
    LoadingComponent,
    TranslocoDirective,
    NgClass,
  ],
})
export class AuthOverviewComponent {
  private router = inject(Router);
  private store = inject(Store);
  private authService = inject(AuthenticationService);
  private toastService = inject(ToastService);

  // Boolean which describes if the loading screen should be displayed
  waiting = false;
  // Saves the potencial email address entered by the user during password reset
  email = '';

  /**
   * This function navigates to the login path.
   */
  onLogin() {
    this.router.navigate([loginPath]);
  }

  /**
   * This function navigates to the register path
   */
  onRegister() {
    this.router.navigate([registerPath]);
  }

  /**
   * This function navigates to the reset password path
   */
  onForgetPwd() {
    this.router.navigate([loginPath, resetPasswordPath]);
  }

  /**
   * This function calls a service to trigger an HTTP-request with the given email address to which a security code should be sent.
   * If the request is successful, the user will be navigated to the next step. If an error occurs it will be displayed.
   *
   * @param email   - The email address to which the security code should be sent
   */
  onSetEmail(email: string) {
    this.waiting = true;
    this.authService.postEmail(email).subscribe({
      next: response => {
        this.waiting = false;
        this.email = response as string;
      },
      error: error => {
        this.waiting = false;
        this.toastService.addToast(
          error.message,
          ToastTypes.ERROR,
          ToastRemoveType.NONE
        );
      },
    });
  }

  /**
   * This function calls a service to trigger an HTTP-request with the given security code.
   * If the request is successful, the user will be navigated to the login. If an error occurs it will be displayed.
   *
   * @param code   - The security code which should be sent
   */
  onSetCode(code: string) {
    this.waiting = true;
    this.authService.postCode(code).subscribe({
      next: () => {
        this.waiting = false;
        this.router.navigate([loginPath]);
      },
      error: error => {
        this.waiting = false;
        this.toastService.addToast(
          error.message,
          ToastTypes.ERROR,
          ToastRemoveType.NONE
        );
      },
    });
  }

  /**
   * This function calls a service to trigger an HTTP-request for login to the account with the given login data.
   * If the request is successful, the user will be navigated to the dashboard. If an error occurs it will be displayed.
   *
   * @param data    - The login data which should be sent
   */
  onSubmitLogin(data: LoginData) {
    this.waiting = true;
    this.authService.postLogin(data).subscribe({
      next: response => {
        this.waiting = false;
        this.store.dispatch(setUser({ user: response as User }));
        // Do not use dashboardPath, otherwise Tests will not execute
        this.router.navigate(['dashboard']);
      },
      error: error => {
        this.waiting = false;
        this.toastService.addToast(
          error.message,
          ToastTypes.ERROR,
          ToastRemoveType.NONE
        );
      },
    });
  }

  /**
   * This function calls a service to trigger an HTTP-request for register to the account with the given login data.
   * If the request is successful, the user will be navigated to the dashboard. If an error occurs it will be displayed.
   *
   * @param data    - The login data which should be sent
   */
  onSubmitRegister(data: RegisterData) {
    this.waiting = true;
    this.authService.postRegister(data).subscribe({
      next: response => {
        this.waiting = false;
        this.store.dispatch(setUser({ user: response as User }));
        // Do not use dashboardPath, otherwise Tests will not execute
        this.router.navigate(['dashboard']);
      },
      error: error => {
        this.waiting = false;
        this.toastService.addToast(
          error.message,
          ToastTypes.ERROR,
          ToastRemoveType.NONE
        );
      },
    });
  }

  isLogin() {
    return this.router.url.includes(loginPath);
  }

  isCode() {
    return this.router.url.includes(resetPasswordPath);
  }
}
