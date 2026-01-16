import { Component, ElementRef, Renderer2, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  initialState,
  selectUser,
  setUser,
  NavbarComponent,
  ToastsComponent,
} from './shared';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { PATHS } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NavbarComponent, ToastsComponent, RouterOutlet],
})
export class AppComponent {
  private store = inject(Store);
  private router = inject(Router);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private translocoService = inject(TranslocoService);
  private contexts = inject(ChildrenOutletContexts);

  constructor() {
    const data = this.store.select(selectUser);
    data.subscribe(state => {
      if (state === initialState) {
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
          imagePath:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.welt.de%2Fimg%2Fdebatte%2Fkommentare%2Fmobile233911782%2F7072501947-ci102l-w1024%2FFDP-Bundesvorsitzender-Christian-Lindner.jpg&f=1&nofb=1&ipt=a83d5fe2d5140ca24dbe2ab4184ba93abc314d4c02f898609808373da747e7f1&ipo=images',
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
