import { DOCUMENT, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MockComponent, MockProvider } from 'ng-mocks';
import { Theme } from './theme';
import { IconService } from 'src/app/core';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';

describe('Theme - Unit Tests', () => {
  let fixture: ComponentFixture<Theme>;

  let document: Document;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Theme, MockComponent(MatIcon)],
      providers: [MockProvider(IconService), provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Theme);
    fixture.detectChanges();
    document = TestBed.inject(DOCUMENT);
    button = getHTMLElement<HTMLButtonElement>(fixture, '#theme')!;
  });

  it('U-Test-1: Component should change theme after clicking the button', async () => {
    button.click();
    await fixture.whenStable();

    expect(document.body.classList).toContain('dark');
  });

  it('U-Test-2: Component should change theme after pressing a key when focused', async () => {
    button.dispatchEvent(new KeyboardEvent('keydown'));
    await fixture.whenStable();

    expect(document.body.classList).toContain('dark');
  });
});
