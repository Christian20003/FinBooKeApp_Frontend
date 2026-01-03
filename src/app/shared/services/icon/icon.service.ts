import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Icon, IconDictionary } from '../../models/Icon';

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
    warning: {
      name: 'warning',
      path: 'assets/icons/action-results/warning.svg',
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
