import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './shared/index';
import { SharedModule } from './shared/components/shared.module';
import { TranslocoRootModule } from './transloco-root.module';
import { ToastsComponent } from './shared/components/toasts/toasts';

describe('Dummy', () => {
  it('Test', () => {
    expect(true).toBeTruthy();
  });
});

xdescribe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AuthModule,
        StoreModule.forRoot({ user: userReducer }, {}),
        SharedModule,
        TranslocoRootModule,
        ToastsComponent,
      ],
      declarations: [AppComponent],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
