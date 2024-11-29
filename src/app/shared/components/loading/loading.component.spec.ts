import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { getNativeElement } from 'src/app/testing/testing-support';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoadingComponent - Unit-Tests', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-Test-1: Should create', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test-2: Message property should be printed', () => {
    const message = 'This is a test';
    fixture.componentRef.setInput('message', message);
    fixture.detectChanges();
    const element = getNativeElement<LoadingComponent, HTMLParagraphElement>(
      fixture,
      '.loading-text'
    );
    expect(element.innerText).toBe(message);
  });
});
