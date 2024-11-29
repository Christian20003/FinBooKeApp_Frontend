import { Component } from '@angular/core';
import {
  setUser,
  moveLeftToRight,
  moveRightToLeft,
  User,
} from 'src/app/shared/index';
import { Router } from '@angular/router';
import {
  loginPath,
  registerPath,
  resetPasswordPath,
} from '../auth-routing-module';
import { AuthenticationService } from './authentication.service';
import { Store } from '@ngrx/store';
import { securityCode, loginData, registerData } from '../auth.interface';

@Component({
  selector: 'app-auth-overview',
  templateUrl: './auth-overview.component.html',
  styleUrls: ['./auth-overview.component.scss'],
  animations: [moveLeftToRight, moveRightToLeft],
  standalone: false,
})
export class AuthOverviewComponent {
  // TODO: Loading Screen
  // Boolean which describes if the loading screen should be displayed
  waiting = false;
  // Saves some potencial error message occurring using the authentication service
  error = '';
  // Saves the potencial email address entered by the user during password reset
  email = '';

  // All text values which are used in this component.
  text = {
    loginButton: 'Anmelden',
    registerButton: 'Registrieren',
    title: 'Willkommen bei der FinBoKeApp',
  };

  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthenticationService
  ) {}

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
    this.error = '';
    this.waiting = true;
    this.authService.postEmail(email).subscribe({
      next: response => {
        this.waiting = false;
        this.email = response as string;
      },
      error: error => {
        this.waiting = false;
        this.error = error.message;
      },
    });
  }

  /**
   * This function calls a service to trigger an HTTP-request with the given security code.
   * If the request is successful, the user will be navigated to the login. If an error occurs it will be displayed.
   *
   * @param code   - The security code which should be sent
   */
  onSetCode(code: securityCode) {
    this.error = '';
    this.waiting = true;
    this.authService.postCode(code).subscribe({
      next: () => {
        this.waiting = false;
        this.router.navigate([loginPath]);
      },
      error: error => {
        this.waiting = false;
        this.error = error.message;
      },
    });
  }

  /**
   * This function calls a service to trigger an HTTP-request for login to the account with the given login data.
   * If the request is successful, the user will be navigated to the dashboard. If an error occurs it will be displayed.
   *
   * @param data    - The login data which should be sent
   */
  onSubmitLogin(data: loginData) {
    this.error = '';
    this.waiting = true;
    this.authService.postLogin(data).subscribe({
      next: response => {
        this.waiting = false;
        this.store.dispatch(setUser({ user: response as User }));
        // TODO: Go to the dashboard path
      },
      error: error => {
        this.waiting = false;
        this.error = error.message;
      },
    });
  }

  /**
   * This function calls a service to trigger an HTTP-request for register to the account with the given login data.
   * If the request is successful, the user will be navigated to the dashboard. If an error occurs it will be displayed.
   *
   * @param data    - The login data which should be sent
   */
  onSubmitRegister(data: registerData) {
    this.error = '';
    this.waiting = true;
    this.authService.postRegister(data).subscribe({
      next: response => {
        this.waiting = false;
        this.store.dispatch(setUser({ user: response as User }));
        // TODO: Go to the dashboard path
      },
      error: error => {
        this.waiting = false;
        this.error = error.message;
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
