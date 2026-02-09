import { Component, ElementRef, Renderer2, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser, setUser, Navbar, Toasts } from './shared';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { IUserUnauthenticated, PATHS } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [Navbar, Toasts, RouterOutlet],
})
export class App {
  private store = inject(Store);
  private router = inject(Router);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private translocoService = inject(TranslocoService);
  private contexts = inject(ChildrenOutletContexts);

  constructor() {
    const data = this.store.select(selectUser);
    data.subscribe(state => {
      if (state === IUserUnauthenticated) {
        this.router.navigate([PATHS.login]);
      }
    });
  }

  isAuthPath(): boolean {
    return (
      this.router.url.includes(PATHS.login) ||
      this.router.url.includes(PATHS.register)
    );
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  // TODO: Delete after development
  goToDashboard() {
    this.store.dispatch(
      setUser({
        user: {
          name: 'Günther',
          email: 'test',
          imagePath: '',
          session: {
            jwtToken: 'ggggg',
            jwtExpire: 44,
            refreshToken: 'gdfds',
            refreshExpire: 44,
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

  changeLanguage() {
    const lang = this.translocoService.getActiveLang();
    if (lang === 'de') {
      this.translocoService.setActiveLang('en');
    } else {
      this.translocoService.setActiveLang('de');
    }
  }
}
