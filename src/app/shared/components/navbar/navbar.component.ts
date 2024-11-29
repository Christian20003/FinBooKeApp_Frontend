import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../stores/UserStore/User.selector';
import { moveDown } from '../..';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [moveDown],
  standalone: false,
})
export class NavbarComponent implements OnInit {
  public imagePath: WritableSignal<string> = signal('');
  public firstLetter: WritableSignal<string> = signal('');
  public activeProfile: WritableSignal<boolean> = signal(false);

  constructor(private store: Store) {}

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

  onProfile() {
    this.activeProfile.update(value => !value);
  }
}
