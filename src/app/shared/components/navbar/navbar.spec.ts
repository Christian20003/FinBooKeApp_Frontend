import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideRouter, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { MemoizedSelector } from '@ngrx/store';
import { Navbar } from './navbar';
import { NavElement } from './nav-element/nav-element';
import { PATHS, TestUser, IUser } from 'src/app/core';
import { selectUser } from '../../stores/UserStore/User.selector';
import { routes } from 'src/app/core/routing/routes';
import {
  getHTMLElement,
  getHTMLElements,
} from 'src/app/testing/helper/get-html-element';
import { provideZonelessChangeDetection } from '@angular/core';
import { getTranslocoModule } from '../../localization/transloco-testing';
import { MockComponent } from 'ng-mocks';
import { MatIcon } from '@angular/material/icon';

describe('Navbar - Unit Tests', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let store: MockStore;
  let selector: MemoizedSelector<object, IUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Navbar,
        NavElement,
        getTranslocoModule(),
        MockComponent(MatIcon),
      ],
      providers: [
        provideMockStore(),
        provideHttpClient(),
        provideRouter(routes),
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    selector = store.overrideSelector(selectUser, TestUser);
    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('U-Test-1: Should create', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test-2: The logo (first) anchor element should link to the dashboard route', () => {
    const debugElement = fixture.debugElement.query(By.css('a'));
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/' + PATHS.dashboard);
  });

  it('U-Test-3: An image should appear as profile button if an url is provided', () => {
    const element = getHTMLElement<HTMLImageElement>(fixture, '.profile-btn');
    expect(element).toBeTruthy();
    expect(element).toBeInstanceOf(HTMLImageElement);
  });

  it('U-Test-4: An p element should appear as profile button with the first character of the user name, if an url is not provided', () => {
    const data = { ...TestUser };
    data.imagePath = '';
    selector.setResult(data);
    store.refreshState();
    fixture.detectChanges();
    const element = getHTMLElement<HTMLParagraphElement>(
      fixture,
      '.profile-btn'
    );
    expect(element).toBeTruthy();
    expect(element).toBeInstanceOf(HTMLParagraphElement);
  });

  it('U-Test-5: An "A" should appear in the profile if an url and name is not provided', () => {
    const data = { ...TestUser };
    data.imagePath = '';
    data.name = '';
    selector.setResult(data);
    store.refreshState();
    fixture.detectChanges();
    const element = getHTMLElement<HTMLParagraphElement>(
      fixture,
      '.profile-btn'
    )!;
    expect(element.innerText).toBe('A');
  });

  it('U-Test-6: After clicking the profile button, another navbar should appear', () => {
    const links = getHTMLElements<HTMLAnchorElement>(fixture, 'a');
    const lastLink = links[links.length - 1];
    lastLink.click();
    fixture.detectChanges();
    const profileNavSmall = getHTMLElement<HTMLDivElement>(
      fixture,
      '.vertical-secondary-nav'
    );
    const profileNavLarge = getHTMLElement<HTMLDivElement>(
      fixture,
      '.vertical-primary-nav'
    );
    if (!profileNavSmall) {
      expect(profileNavLarge).toBeTruthy();
    } else {
      expect(profileNavSmall).toBeTruthy();
    }
  });
});
