import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideRouter, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MemoizedSelector } from '@ngrx/store';
import { MockComponent, MockModule } from 'ng-mocks';
import { dashboardPath, routes } from 'src/app/routing/app-routing.module';
import {
  getNativeElement,
  getNativeElements,
} from 'src/app/testing/testing-support';
import { NavbarComponent } from './navbar.component';
import { NavElementsComponent } from './nav-elements/nav-elements.component';
import { SharedModule } from '../shared.module';
import { TestUser, User } from '../../models/User';
import { selectUser } from '../../stores/UserStore/User.selector';

xdescribe('NavbarComponent - Unit Tests', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store: MockStore;
  let selector: MemoizedSelector<object, User>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        NavElementsComponent,
        BrowserAnimationsModule,
        SharedModule,
      ],
      providers: [
        provideMockStore(),
        provideHttpClient(),
        provideRouter(routes),
      ],
    }).compileComponents();

    // Currently MockComponent() not directly usable in imports field
    TestBed.overrideComponent(NavElementsComponent, {
      remove: { imports: [NavElementsComponent, SharedModule] },
      add: {
        imports: [
          MockComponent(NavElementsComponent),
          MockModule(SharedModule),
        ],
      },
    });

    store = TestBed.inject(MockStore);
    selector = store.overrideSelector(selectUser, TestUser);
    fixture = TestBed.createComponent(NavbarComponent);
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
    expect(routerLink['href']).toEqual('/' + dashboardPath);
  });

  it('U-Test-3: An image should appear as profile button if an url is provided', () => {
    const element = getNativeElement<NavbarComponent, HTMLImageElement>(
      fixture,
      '.profile-btn'
    );
    expect(element).toBeTruthy();
    expect(element).toBeInstanceOf(HTMLImageElement);
  });

  it('U-Test-4: An p element should appear as profile button with the first character of the user name, if an url is not provided', () => {
    const data = { ...TestUser };
    data.imagePath = '';
    selector.setResult(data);
    store.refreshState();
    fixture.detectChanges();
    const element = getNativeElement<NavbarComponent, HTMLParagraphElement>(
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
    const element = getNativeElement<NavbarComponent, HTMLParagraphElement>(
      fixture,
      '.profile-btn'
    );
    expect(element.innerText).toBe('A');
  });

  it('U-Test-6: After clicking the profile button, another navbar should appear', () => {
    const links = getNativeElements<NavbarComponent, HTMLAnchorElement>(
      fixture,
      'a'
    );
    const lastLink = links[links.length - 1];
    lastLink.click();
    fixture.detectChanges();
    const profileNavSmall = getNativeElement<NavbarComponent, HTMLDivElement>(
      fixture,
      '.vertical-secondary-nav'
    );
    const profileNavLarge = getNativeElement<NavbarComponent, HTMLDivElement>(
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
