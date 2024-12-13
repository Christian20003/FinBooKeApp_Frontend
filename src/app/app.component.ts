import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser, setUser } from './shared';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { loginPath, registerPath } from './auth/auth-routing-module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private store: Store,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private translocoService: TranslocoService,
    private contexts: ChildrenOutletContexts
  ) {
    const data = this.store.select(selectUser);
    data.subscribe(state => {
      if (state.id <= 0) {
        this.router.navigate(['login']);
      }
    });
  }

  isAuthPath(): boolean {
    return (
      this.router.url.includes(loginPath) ||
      this.router.url.includes(registerPath)
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
          id: 1,
          name: 'Günther',
          email: 'test',
          imagePath:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.welt.de%2Fimg%2Fdebatte%2Fkommentare%2Fmobile233911782%2F7072501947-ci102l-w1024%2FFDP-Bundesvorsitzender-Christian-Lindner.jpg&f=1&nofb=1&ipt=a83d5fe2d5140ca24dbe2ab4184ba93abc314d4c02f898609808373da747e7f1&ipo=images',
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

  changeLanguage() {
    const lang = this.translocoService.getActiveLang();
    if (lang === 'de') {
      this.translocoService.setActiveLang('en');
    } else {
      this.translocoService.setActiveLang('de');
    }
  }
}
