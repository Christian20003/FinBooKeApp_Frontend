import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser, setUser } from './shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    const data = this.store.select(selectUser);
    data.subscribe(state => {
      if (state.id > 0) {
        this.isLoggedIn = true;
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  // TODO: Delete after development
  goToDashboard() {
    this.store.dispatch(
      setUser({
        user: {
          id: 1,
          name: 'Günther',
          email: 'test',
          imagePath: '',
          session: {
            token: 'ggggg',
            expire: 44,
          },
        },
      })
    );
    this.router.navigate(['dashboard']);
  }

  changeTheme() {
    const body = this.elementRef.nativeElement.ownerDocument
      .body as HTMLBodyElement;
    if (body.classList.contains('dark')) {
      this.renderer.removeClass(body, 'dark');
    } else {
      this.renderer.addClass(body, 'dark');
    }
  }
}
