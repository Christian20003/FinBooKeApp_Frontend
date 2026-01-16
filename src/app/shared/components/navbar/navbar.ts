import { Component, OnInit, signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/shared/stores/UserStore/User.selector';
import { NavElement } from './nav-element/nav-element';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ICON_NAMES, IconService } from 'src/app/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [NavElement, RouterLink, RouterLinkActive, MatIcon],
})
export class Navbar implements OnInit {
  private readonly store = inject(Store);
  private readonly iconService = inject(IconService);

  protected readonly imagePath = signal<string>('');
  protected readonly firstLetter = signal<string>('');
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
      } else {
        this.firstLetter.set('A');
      }
    });
  }

  protected onProfile(): void {
    this.activeProfile.update(value => !value);
  }
}
