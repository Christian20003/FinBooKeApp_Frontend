import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ToastsComponent } from './shared/components/toasts/toasts';
import { MockComponent } from 'ng-mocks';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { provideZonelessChangeDetection } from '@angular/core';

xdescribe('AppComponent - Unit Tests', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MockComponent(ToastsComponent),
        MockComponent(NavbarComponent),
      ],
      providers: [provideZonelessChangeDetection()],
    })
  );

  it('U-Test-1: Component should exist', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
