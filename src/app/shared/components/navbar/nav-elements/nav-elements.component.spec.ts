import { DebugElement } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterLinkWithHref, RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import {
  accountsPath,
  dashboardPath,
  financesPath,
  profilePath,
  routes,
  settingsPath,
} from 'src/app/routing/app-routing.module';
import { AuthenticationService } from 'src/app/auth/auth-overview/authentication.service';
import { deleteUser } from 'src/app/shared';
import { getNativeElement } from 'src/app/testing/testing-support';
import { loginPath } from 'src/app/auth/auth-routing-module';
import { NavElementsComponent } from './nav-elements.component';

xdescribe('NavElementsComponent - Unit Tests', () => {
  let component: NavElementsComponent;
  let fixture: ComponentFixture<NavElementsComponent>;
  let router: Router;
  let store: MockStore;
  const stubService = jasmine.createSpyObj('AuthenticationService', [
    'deleteLogin',
  ]);
  const getAnchorElem = (): DebugElement => {
    return fixture.debugElement.query(By.css('a'));
  };
  const changeInput = (name: string, value: string): void => {
    fixture.componentRef.setInput(name, value);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavElementsComponent, RouterModule.forRoot(routes)],
      providers: [
        { provide: AuthenticationService, useValue: stubService },
        provideMockStore(),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavElementsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('U-Test-1: Should create', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test-2: Anchor "dashboard" should link to the dashboard route', () => {
    changeInput('type', 'dashboard');
    fixture.detectChanges();
    const debugElement = getAnchorElem();
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/' + dashboardPath);
  });

  it('U-Test-3: Anchor "finances" should link to the finances route', () => {
    changeInput('type', 'finances');
    fixture.detectChanges();
    const debugElement = getAnchorElem();
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/' + financesPath);
  });

  it('U-Test-4: Anchor "accounts" should link to the accounts route', () => {
    changeInput('type', 'accounts');
    fixture.detectChanges();
    const debugElement = getAnchorElem();
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/' + accountsPath);
  });

  it('U-Test-5: Anchor "profile" should link to the profile route', () => {
    changeInput('type', 'profile');
    fixture.detectChanges();
    const debugElement = getAnchorElem();
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/' + profilePath);
  });

  it('U-Test-6: Anchor "settings" should link to the settings route', () => {
    changeInput('type', 'settings');
    fixture.detectChanges();
    const debugElement = getAnchorElem();
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/' + settingsPath);
  });

  it('U-Test-7: After clicking the logout anchor element, the dispatch function should be called with delete action', () => {
    stubService.deleteLogin.and.returnValue(of('Success'));
    changeInput('type', 'logout');
    fixture.detectChanges();
    spyOn(store, 'dispatch');
    const element = getNativeElement<NavElementsComponent, HTMLAnchorElement>(
      fixture,
      'a'
    );
    element.click();
    expect(store.dispatch).toHaveBeenCalledOnceWith(deleteUser());
  });

  it('U-Test-8: After clicking the logout anchor element, the navigate function should be called with the correct route', () => {
    stubService.deleteLogin.and.returnValue(of('Success'));
    changeInput('type', 'logout');
    fixture.detectChanges();
    spyOn(router, 'navigate');
    const element = getNativeElement<NavElementsComponent, HTMLAnchorElement>(
      fixture,
      'a'
    );
    element.click();
    expect(router.navigate).toHaveBeenCalledOnceWith([loginPath]);
  });
});
