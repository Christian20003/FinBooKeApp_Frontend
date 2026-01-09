import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Icon, IconDictionary } from 'src/app/core/models/Icon';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  // Dependency to register icons
  private readonly iconRegistry = inject(MatIconRegistry);
  // Dependency to access SVG resource
  private readonly domSanitizer = inject(DomSanitizer);
  // A list of all icons available
  private readonly icons: IconDictionary = {
    success: {
      name: 'success',
      path: 'assets/icons/action-results/success.svg',
    },
    error: {
      name: 'error',
      path: 'assets/icons/action-results/error.svg',
    },
    info: {
      name: 'info',
      path: 'assets/icons/action-results/info.svg',
    },
    warning: {
      name: 'warning',
      path: 'assets/icons/action-results/warning.svg',
    },
    close: {
      name: 'close',
      path: 'assets/icons/actions/close.svg',
    },
    loading: {
      name: 'loading',
      path: 'assets/icons/symbols/coins.svg',
    },
    email: {
      name: 'email',
      path: 'assets/icons/symbols/email.svg',
    },
    password: {
      name: 'password',
      path: 'assets/icons/symbols/password.svg',
    },
  };

  /**
   * This method registers a specific SVG icon, so that it can
   * be used with Angular-Materials. If the provided icon `name`
   * does not exist, nothing will happen.
   *
   * @param name The name of the icon
   */
  registerIcon(name: string): void {
    const icon = this.icons[name];
    if (icon === null || icon === undefined) return;
    const url = this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path);
    this.iconRegistry.addSvgIcon(icon.name, url);
  }

  /**
   * This method registers multiple SVG icons, so that they can be
   * used with Angular-Materials. If a provided icon `name`
   * does not exist, nothing will happen.
   *
   * @param names All names of the icons that should be registered.
   */
  registerIcons(names: string[]): void {
    for (const name of names) {
      this.registerIcon(name);
    }
  }

  /**
   * This method returns a list of all available icons that have been
   * added to this application.
   */
  getAvailableIcons(): Icon[] {
    const result = [];
    for (const key in this.icons) {
      result.push(this.icons[key]);
    }
    return result;
  }
}
