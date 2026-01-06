import { Component, ElementRef, Renderer2, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser, setUser } from './shared';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { loginPath, registerPath } from './auth/auth-routing-module';
import { routingAnimation } from './routing/routing-animation';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastsComponent } from './shared/components/toasts/toasts';
import { ɵɵRouterOutlet } from '@angular/router/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routingAnimation],
  imports: [NavbarComponent, ToastsComponent, ɵɵRouterOutlet],
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
