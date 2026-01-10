import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { LoadingComponent } from './loading';
import { setInputSignal } from 'src/app/testing/helper/set-input-signal';
import { getTranslocoModule } from 'src/app/shared/localization/transloco-testing';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';

describe('LoadingComponent - Unit-Tests', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  const message = 'This is a test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoadingComponent, getTranslocoModule()],
      providers: [provideHttpClient(), provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    setInputSignal(fixture, 'message', message);
    fixture.detectChanges();
  });

  it('U-Test-1: Component should exist', () => {
    expect(component).withContext('LoadingComponent should exist').toBeTruthy();
  });

  it('U-Test-2: Message property should be displayed', () => {
    fixture.detectChanges();
    const element = getHTMLElement<HTMLParagraphElement>(
      fixture,
      '.loading-text'
    )!;
    expect(element.innerText).toBe(message);
  });
});
