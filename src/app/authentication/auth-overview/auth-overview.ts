import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  setUser,
  moveLeftToRight,
  moveRightToLeft,
  LoadingComponent,
  TRANSLATION_KEYS,
} from 'src/app/shared/index';
import {
  IUser,
  ToastLifeTime,
  ToastType,
  AuthenticationService,
  ILoginDTO,
  IRegisterDTO,
  PATHS,
} from 'src/app/core/index';
import { ToastService } from 'src/app/core/services/toast/toast-service';
import { SetAccessCodeComponent } from '../set-access-code/set-access-code';
import { RequestAccessCodeComponent } from '../request-access-code/request-access-code';
import { LoginComponent } from '../login/login';
import { RegisterComponent } from '../register/register';
import { TranslocoDirective } from '@jsverse/transloco';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-auth-overview',
  templateUrl: './auth-overview.html',
  styleUrls: ['./auth-overview.scss'],
  standalone: true,
  animations: [moveLeftToRight, moveRightToLeft],
  imports: [
    SetAccessCodeComponent,
    RequestAccessCodeComponent,
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

  // Keys for translated text
  protected readonly translationKeys = TRANSLATION_KEYS;

  // Boolean which describes if the loading screen should be displayed
  waiting = false;
  // Saves the potencial email address entered by the user during password reset
  email = '';

  /**
   * This function navigates to the login path.
   */
  onLogin() {
    this.router.navigate([PATHS.login]);
  }

  /**
   * This function navigates to the register path
   */
  onRegister() {
    this.router.navigate([PATHS.register]);
  }

  /**
   * This function navigates to the reset password path
   */
  onForgetPwd() {
    this.router.navigate([PATHS.login, PATHS.forgotPwd]);
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
          ToastType.ERROR,
          ToastLifeTime.NONE
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
        this.router.navigate([PATHS.login]);
      },
      error: error => {
        this.waiting = false;
        this.toastService.addToast(
          error.message,
          ToastType.ERROR,
          ToastLifeTime.NONE
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
  onSubmitLogin(data: ILoginDTO) {
    this.waiting = true;
    this.authService.postLogin(data).subscribe({
      next: response => {
        this.waiting = false;
        this.store.dispatch(setUser({ user: response as IUser }));
        // Do not use dashboardPath, otherwise Tests will not execute
        this.router.navigate([PATHS.dashboard]);
      },
      error: error => {
        this.waiting = false;
        this.toastService.addToast(
          error.message,
          ToastType.ERROR,
          ToastLifeTime.NONE
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
  onSubmitRegister(data: IRegisterDTO) {
    this.waiting = true;
    this.authService.postRegister(data).subscribe({
      next: response => {
        this.waiting = false;
        this.store.dispatch(setUser({ user: response as IUser }));
        // Do not use dashboardPath, otherwise Tests will not execute
        this.router.navigate([PATHS.dashboard]);
      },
      error: error => {
        this.waiting = false;
        this.toastService.addToast(
          error.message,
          ToastType.ERROR,
          ToastLifeTime.NONE
        );
      },
    });
  }

  isLogin() {
    return this.router.url.includes(PATHS.login);
  }

  isCode() {
    return this.router.url.includes(PATHS.forgotPwd);
  }
}
