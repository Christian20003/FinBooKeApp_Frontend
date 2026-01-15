import { Component, OnInit, signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/shared/stores/UserStore/User.selector';
import { NavElementComponent } from './nav-element/nav-element';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [NavElementComponent, RouterLink, RouterLinkActive, LogoComponent],
})
export class NavbarComponent implements OnInit {
  private readonly store = inject(Store);

  protected readonly imagePath = signal<string>('');
  protected readonly firstLetter = signal<string>('');
  protected readonly activeProfile = signal<boolean>(false);

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
