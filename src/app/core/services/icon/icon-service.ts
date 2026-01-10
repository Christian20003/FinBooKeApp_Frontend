import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IIcon, IconDictionary } from 'src/app/core/models/icon/icon';
import { ICON_NAMES } from './icon-names';
import { ICON_PATHS } from './icon-paths';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  // Dependency to register icons
  private readonly iconRegistry = inject(MatIconRegistry);
  // Dependency to access SVG resource
  private readonly domSanitizer = inject(DomSanitizer);
  // A list of all icons available
  private readonly icons: IconDictionary = {};

  constructor() {
    for (const [, name] of Object.entries(ICON_NAMES)) {
      this.icons[name] = {
        name: name,
        path: ICON_PATHS[name],
      };
    }
  }

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
  getAvailableIcons(): IIcon[] {
    const result = [];
    for (const key in this.icons) {
      result.push(this.icons[key]);
    }
    return result;
  }
}
