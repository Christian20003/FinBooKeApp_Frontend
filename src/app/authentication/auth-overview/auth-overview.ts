import { Component, inject, signal } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoDirective } from '@jsverse/transloco';
import { setUser, Loading, TRANSLATION_KEYS } from 'src/app/shared/index';
import {
  ToastLifeTime,
  ToastType,
  AuthenticationService,
  ILoginDTO,
  IRegisterDTO,
  PATHS,
} from 'src/app/core/index';
import { ToastService } from 'src/app/core/services/toast/toast-service';
import { SetAccessCode } from 'src/app/authentication/set-access-code/set-access-code';
import { RequestAccessCode } from 'src/app/authentication/request-access-code/request-access-code';
import { Login } from 'src/app/authentication/login/login';
import { Register } from 'src/app/authentication/register/register';

/**
 * Component that represent the authentication view.
 */
@Component({
  selector: 'app-auth-overview',
  templateUrl: './auth-overview.html',
  styleUrls: ['./auth-overview.scss'],
  imports: [
    SetAccessCode,
    RequestAccessCode,
    Login,
    Register,
    Loading,
    TranslocoDirective,
    NgClass,
  ],
})
export class AuthOverview {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly authService = inject(AuthenticationService);
  private readonly toastService = inject(ToastService);

  protected readonly translationKeys = TRANSLATION_KEYS;
  protected loading = signal(false);
  protected email = signal('');

  protected isLogin = signal<boolean>(this.router.url.includes(PATHS.login));
  protected isForgotPwd = signal<boolean>(
    this.router.url.includes(PATHS.forgotPwd)
  );
  protected isResetPwd = signal<boolean>(
    this.router.url.includes(PATHS.resetPwd)
  );

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isLogin.update(() => event.url.includes(PATHS.login));
        this.isForgotPwd.update(() => event.url.includes(PATHS.forgotPwd));
        this.isResetPwd.update(() => event.url.includes(PATHS.resetPwd));
      }
    });
  }

  /**
   * This method navigates to the login path.
   */
  protected onLogin(): void {
    this.router.navigate([PATHS.login]);
  }

  /**
   * This method navigates to the register path
   */
  protected onRegister(): void {
    this.router.navigate([PATHS.register]);
  }

  /**
   * This method navigates to the reset password path
   */
  protected onForgetPwd(): void {
    this.router.navigate([PATHS.login, PATHS.forgotPwd]);
  }

  /**
   * This method makes an HTTP request to send an access code to the given
   * email address.
   *
   * @param email The email address.
   */
  protected onSendEmail(email: string): void {
    this.loading.update(() => true);
    this.email.update(() => email);
    this.authService.postForgotPwd(email).subscribe({
      complete: () => {
        this.loading.update(() => false);
        this.router.navigate([PATHS.login, PATHS.resetPwd]);
      },
      error: error => {
        this.loading.update(() => false);
        this.toastService.addToast(
          error.message,
          ToastType.ERROR,
          ToastLifeTime.NONE
        );
      },
    });
  }

  /**
   * This method makes an HTTP request to send an access code to reset
   * the password.
   *
   * @param code The access code.
   */
  protected onSendAccessCode(code: string): void {
    this.loading.update(() => true);
    this.authService.postAccessCode(code).subscribe({
      complete: () => {
        this.loading.update(() => false);
        this.router.navigate([PATHS.login]);
      },
      error: error => {
        this.loading.update(() => false);
        this.toastService.addToast(
          error.message,
          ToastType.ERROR,
          ToastLifeTime.NONE
        );
      },
    });
  }

  /**
   * This method uses an HTTP request to log the user in.
   *
   * @param data The login data.
   */
  protected onSubmitLogin(data: ILoginDTO): void {
    this.loading.update(() => true);
    this.authService.postLogin(data).subscribe({
      next: response => {
        this.loading.update(() => false);
        this.store.dispatch(setUser({ user: response }));
        this.router.navigate([PATHS.dashboard]);
      },
      error: error => {
        this.loading.update(() => false);
        this.toastService.addToast(
          error.message,
          ToastType.ERROR,
          ToastLifeTime.NONE
        );
      },
    });
  }

  /**
   * This method uses an HTTP request to register the user.
   *
   * @param data The registration data.
   */
  protected onSubmitRegister(data: IRegisterDTO): void {
    this.loading.update(() => true);
    this.authService.postRegister(data).subscribe({
      next: response => {
        this.loading.update(() => false);
        this.store.dispatch(setUser({ user: response }));
        this.router.navigate([PATHS.dashboard]);
      },
      error: error => {
        this.loading.update(() => false);
        this.toastService.addToast(
          error.message,
          ToastType.ERROR,
          ToastLifeTime.NONE
        );
      },
    });
  }
}
