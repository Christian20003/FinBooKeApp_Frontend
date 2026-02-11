import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TranslocoService } from '@jsverse/transloco';
import { MockComponent, MockDirective, ngMocks } from 'ng-mocks';
import { Language } from './language';
import { getTranslocoModule } from 'src/app/shared/localization/transloco-testing';
import { OnClickOutside } from 'src/app/core';
import {
  getHTMLElement,
  getHTMLElements,
} from 'src/app/testing/helper/get-html-element';

describe('Language - Unit Tests', () => {
  let fixture: ComponentFixture<Language>;
  let transloco: TranslocoService;

  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Language,
        NgClass,
        MockComponent(MatIcon),
        MockDirective(OnClickOutside),
        getTranslocoModule(),
      ],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Language);
    transloco = TestBed.inject(TranslocoService);
    fixture.detectChanges();
    button = getHTMLElement<HTMLButtonElement>(fixture, '#language')!;
  });

  it('U-Test-1: Component should show active language', async () => {
    button.click();
    await fixture.whenStable();

    const option = getHTMLElement<HTMLElement>(fixture, '.active');

    expect(option).toBeTruthy();
  });

  it('U-Test-2: Component should show language menu after clicking the button', async () => {
    button.click();
    await fixture.whenStable();

    const menu = getHTMLElement<HTMLElement>(fixture, '#menu');
    expect(menu).toBeTruthy();
  });

  it('U-Test-3: Component should show all available languages', async () => {
    button.click();
    await fixture.whenStable();

    const options = getHTMLElements<HTMLElement>(fixture, '.option');
    expect(options.length).toBe(transloco.getAvailableLangs().length);
  });

  it('U-Test-4: Component should change language of application', async () => {
    const activeLang = transloco.getActiveLang();
    button.click();
    await fixture.whenStable();

    const options = getHTMLElements<HTMLElement>(fixture, '.option');
    const selection = options.pop();
    selection?.click();
    await fixture.whenStable();

    expect(activeLang).not.toBe(transloco.getActiveLang());
  });

  it('U-Test-5: Component should deactivate menu after clickling the button again', async () => {
    button.click();
    await fixture.whenStable();
    button.click();
    await fixture.whenStable();

    const menu = getHTMLElement<HTMLElement>(fixture, '#menu');
    expect(menu).toBeFalsy();
  });

  it('U-Test-6: Component should deactivate menu if the user clicked outside the component', async () => {
    button.click();
    await fixture.whenStable();

    const directive = ngMocks.findInstance(fixture, OnClickOutside);
    directive.clickOutside.emit();
    await fixture.whenStable();

    const menu = getHTMLElement<HTMLElement>(fixture, '#menu');
    expect(menu).toBeFalsy();
  });
});
