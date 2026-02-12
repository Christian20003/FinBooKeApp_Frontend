import { Component, OnInit, signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/shared/stores/UserStore/User.selector';
import { NavElement } from './nav-element/nav-element';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ICON_NAMES, IconService, OnClickOutside } from 'src/app/core';
import { Language } from '../language/language';
import { Theme } from '../theme/theme';

/**
 * This component represent the navbar of this application.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [
    NavElement,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    OnClickOutside,
    Language,
    Theme,
  ],
})
export class Navbar implements OnInit {
  private readonly store = inject(Store);
  private readonly iconService = inject(IconService);

  protected readonly imagePath = signal<string>('');
  protected readonly firstLetter = signal<string>('A');
  protected readonly activeProfile = signal<boolean>(false);

  constructor() {
    this.iconService.registerIcon(ICON_NAMES.logo);
  }

  ngOnInit(): void {
    const data = this.store.select(selectUser);
    data.subscribe(state => {
      this.imagePath.set(state.imagePath);
      if (state.name != '') {
        const char = state.name.charAt(0).toUpperCase();
        this.firstLetter.set(char);
      }
    });
  }

  /**
   * This method activates and deactivates the second vertical
   * navbar.
   */
  protected onProfile(): void {
    this.activeProfile.update(value => !value);
  }

  /**
   * This methid deactivates the vertical navbar if the user
   * has clicked outside the HTML element.
   */
  protected onOutside(): void {
    if (this.activeProfile()) {
      this.activeProfile.update(() => false);
    }
  }
}
