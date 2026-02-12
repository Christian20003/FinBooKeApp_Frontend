import { Component, DOCUMENT, inject, Renderer2, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ICON_NAMES, IconService } from 'src/app/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.html',
  styleUrl: './theme.scss',
  imports: [MatIcon],
})
export class Theme {
  private readonly icon = inject(IconService);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);

  protected readonly isLight = signal<boolean>(
    !this.document.body.classList.contains('dark')
  );

  constructor() {
    this.icon.registerIcons([ICON_NAMES.light_theme, ICON_NAMES.dark_theme]);
  }

  /**
   * This method changes the theme of the application.
   */
  protected onTheme(): void {
    if (this.isLight()) {
      this.renderer.addClass(this.document.body, 'dark');
    } else {
      this.renderer.removeClass(this.document.body, 'dark');
    }
    this.isLight.update(value => !value);
  }

  /**
   * This method returns the icon name of a theme.
   *
   * @returns The icon name.
   */
  protected getIconName(): string {
    if (this.isLight()) {
      return ICON_NAMES.dark_theme;
    }
    return ICON_NAMES.light_theme;
  }
}
