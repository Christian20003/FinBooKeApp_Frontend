import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideRouter, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { MemoizedSelector } from '@ngrx/store';
import { MatIcon } from '@angular/material/icon';
import { MockComponent, MockDirective } from 'ng-mocks';
import { Navbar } from './navbar';
import { NavElement } from './nav-element/nav-element';
import { PATHS, IUser, OnClickOutside } from 'src/app/core';
import { selectUser } from 'src/app/shared/stores/UserStore/User.selector';
import { routes } from 'src/app/core/routing/routes';
import {
  getHTMLElement,
  getHTMLElements,
} from 'src/app/testing/helper/get-html-element';
import { getTranslocoModule } from 'src/app/shared/localization/transloco-testing';
import { TestUser } from 'src/app/core/index.spec';

describe('Navbar - Unit Tests', () => {
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
        MockDirective(OnClickOutside),
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
    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('U-Test-1: Component should link to the dashboard route with the logo', () => {
    const debugElement = fixture.debugElement.query(By.css('a'));
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/' + PATHS.dashboard);
  });

  it('U-Test-2: Component should show an image as profile button when an valid url is provided', () => {
    const element = getHTMLElement<HTMLImageElement>(fixture, '#profile');
    expect(element).toBeTruthy();
    expect(element?.src).toBe(TestUser.imagePath);
  });

  it('U-Test-3: Component should show its alt text as profile button, if a invalid url is provided', async () => {
    const data = { ...TestUser };
    data.imagePath = '';
    selector.setResult(data);
    store.refreshState();
    await fixture.whenStable();

    const element = getHTMLElement<HTMLImageElement>(fixture, '#profile');
    expect(element).toBeTruthy();
    expect(element?.naturalWidth).toBe(0);
  });

  it('U-Test-5: Component should show the first letter of the user name in the profile if an url is not provided', async () => {
    const data = { ...TestUser };
    data.imagePath = '';
    selector.setResult(data);
    store.refreshState();
    await fixture.whenStable();

    const element = getHTMLElement<HTMLImageElement>(fixture, '#profile')!;
    expect(element.alt).toBe(TestUser.name.toUpperCase()[0]);
  });

  it('U-Test-6: Component should show a vertical navbar after clicking the profile button', async () => {
    const links = getHTMLElements<HTMLAnchorElement>(fixture, 'a');
    const lastLink = links.pop();
    lastLink?.click();
    await fixture.whenStable();

    const profileNavSmall = getHTMLElement<HTMLDivElement>(
      fixture,
      '.vertical-secondary-nav'
    );
    const profileNavLarge = getHTMLElement<HTMLDivElement>(
      fixture,
      '.vertical-primary-nav'
    );
    expect(profileNavLarge || profileNavSmall).toBeTruthy();
  });
});
