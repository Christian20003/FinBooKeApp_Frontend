import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Toasts, Navbar } from './shared';
import { MockComponent } from 'ng-mocks';
import { provideZonelessChangeDetection } from '@angular/core';

xdescribe('App - Unit Tests', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [App, MockComponent(Toasts), MockComponent(Navbar)],
      providers: [provideZonelessChangeDetection()],
    })
  );

  it('U-Test-1: Component should exist', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
