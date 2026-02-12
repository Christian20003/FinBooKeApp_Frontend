import { NgClass } from '@angular/common';
import { Component, input, inject, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { Store } from '@ngrx/store';
import { deleteUser } from 'src/app/shared/stores/UserStore/User.actions';
import { TRANSLATION_KEYS } from 'src/app/shared/localization/translation-keys';
import {
  AuthenticationService,
  ICON_NAMES,
  IconService,
  PATHS,
  ToastLifeTime,
  ToastService,
  ToastType,
} from 'src/app/core';

@Component({
  selector: 'app-nav-element',
  templateUrl: './nav-element.html',
  styleUrl: './nav-element.scss',
  imports: [
    MatIconModule,
    NgClass,
    TranslocoDirective,
    RouterLink,
    RouterLinkActive,
  ],
})
export class NavElement {
  private readonly authService = inject(AuthenticationService);
  private readonly toastService = inject(ToastService);
  private readonly iconService = inject(IconService);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly type = input<string>('dashboard');
  readonly link = computed<string>(() => `/${this.type()}`);
  readonly borderAnimation = input<boolean>(false);

  constructor() {
    this.iconService.registerIcons([
      ICON_NAMES.dashboard,
      ICON_NAMES.finances,
      ICON_NAMES.profile,
      ICON_NAMES.settings,
      ICON_NAMES.logout,
    ]);
  }

  /**
   * This method logs out the user.
   */
  protected onLogout(): void {
    this.authService.postLogout().subscribe({
      complete: () => {
        this.store.dispatch(deleteUser());
        this.router.navigate([PATHS.login]);
      },
      error: error => {
        this.toastService.addToast(
          error.message,
          ToastType.ERROR,
          ToastLifeTime.NONE
        );
      },
    });
  }

  /**
   * This method returns the key to retrieve the correct
   * translation from transloco.
   */
  protected get key(): string {
    switch (this.type()) {
      case PATHS.dashboard:
        return TRANSLATION_KEYS.navbar.dashboard;
      case PATHS.finances:
        return TRANSLATION_KEYS.navbar.finances;
      case PATHS.profile:
        return TRANSLATION_KEYS.navbar.profile;
      case PATHS.settings:
        return TRANSLATION_KEYS.navbar.settings;
      default:
        return TRANSLATION_KEYS.navbar.logout;
    }
  }

  /**
   * This method returns the correct css class to set the
   * color of the SVG icon.
   */
  protected get cssClass(): string {
    if (this.type() === PATHS.finances) {
      return 'nav-elem-icon-stroke';
    }
    return 'nav-elem-icon-fill';
  }
}
