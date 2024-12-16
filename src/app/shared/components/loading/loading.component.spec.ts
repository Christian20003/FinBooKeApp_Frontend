import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getNativeElement } from 'src/app/testing/testing-support';
import { getTranslocoModule } from 'src/app/testing/transloco-testing.module';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent - Unit-Tests', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoadingComponent,
        BrowserAnimationsModule,
        getTranslocoModule(),
      ],
      providers: [provideHttpClient()],
    });
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-Test-1: Should create', () => {
    expect(component).withContext('LoadingComponent should exist').toBeTruthy();
  });

  it('U-Test-2: Message property should be printed', () => {
    const message = 'This is a test';
    fixture.componentRef.setInput('message', message);
    fixture.detectChanges();
    const element = getNativeElement<LoadingComponent, HTMLParagraphElement>(
      fixture,
      '.loading-text'
    );
    expect(element.innerText)
      .withContext('Displayed should equal the value from input signal')
      .toBe(message);
  });
});
