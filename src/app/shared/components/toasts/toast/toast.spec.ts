import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MockComponent } from 'ng-mocks';
import { Toast } from './toast';
import { IconService, ToastLifeTime, ToastType } from 'src/app/core';
import { setInputSignal } from 'src/app/testing/helper/set-input-signal';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';
import { TestToast } from 'src/app/core/index.spec';

describe('Toast - Unit Tests', () => {
  let component: Toast;
  let fixture: ComponentFixture<Toast>;

  beforeEach(() => {
    const service = jasmine.createSpyObj('IconService', ['registerIcons']);
    TestBed.configureTestingModule({
      imports: [Toast, MockComponent(MatIcon)],
      providers: [provideZonelessChangeDetection()],
    });
    TestBed.overrideProvider(IconService, { useValue: service });
    fixture = TestBed.createComponent(Toast);
    component = fixture.componentInstance;
    TestToast.lifetime = ToastLifeTime.NONE;
  });

  it('U-Test-1: Component should exist', () => {
    setInputSignal(fixture, 'toast', TestToast);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('U-Test-2: Toast short lifetime should call remove automatically', () => {
    jasmine.clock().install();
    const emit = spyOn(component.remove, 'emit');
    // @ts-expect-error Get lifetime
    const time = component.shortLifetime;
    TestToast.lifetime = ToastLifeTime.SHORT;
    setInputSignal(fixture, 'toast', TestToast);
    fixture.detectChanges();

    component.ngOnInit();
    jasmine.clock().tick(time);

    expect(emit).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('U-Test-3: Toast long lifetime should call remove automatically', () => {
    jasmine.clock().install();
    const emit = spyOn(component.remove, 'emit');
    // @ts-expect-error Get lifetime
    const time = component.longLifetime;
    TestToast.lifetime = ToastLifeTime.LONG;
    setInputSignal(fixture, 'toast', TestToast);
    fixture.detectChanges();

    component.ngOnInit();
    jasmine.clock().tick(time);

    expect(emit).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('U-Test-4: Clicking close button should call remove', () => {
    setInputSignal(fixture, 'toast', TestToast);
    fixture.detectChanges();

    const button = getHTMLElement<HTMLButtonElement>(fixture, '.close');
    const emit = spyOn(component.remove, 'emit');
    button!.click();

    expect(emit).toHaveBeenCalled();
  });

  it('U-Test-5: Toast type error should assign correct css classes in template', () => {
    TestToast.type = ToastType.ERROR;
    setInputSignal(fixture, 'toast', TestToast);
    fixture.detectChanges();

    const box = getHTMLElement<HTMLSpanElement>(fixture, '.error-box');
    const svg = getHTMLElement<MatIcon>(fixture, '.error-icon');
    const line = getHTMLElement<HTMLSpanElement>(fixture, '.time-line');

    expect(box).toBeTruthy();
    expect(svg).toBeTruthy();
    expect(line!.className).toContain('error-box');
  });

  it('U-Test-6: Toast type warning should assign correct css classes in template', () => {
    TestToast.type = ToastType.WARNING;
    setInputSignal(fixture, 'toast', TestToast);
    fixture.detectChanges();

    const box = getHTMLElement<HTMLSpanElement>(fixture, '.warning-box');
    const svg = getHTMLElement<MatIcon>(fixture, '.warning-icon');
    const line = getHTMLElement<HTMLSpanElement>(fixture, '.time-line');

    expect(box).toBeTruthy();
    expect(svg).toBeTruthy();
    expect(line!.className).toContain('warning-box');
  });

  it('U-Test-7: Toast type info should assign correct css classes in template', () => {
    TestToast.type = ToastType.INFO;
    setInputSignal(fixture, 'toast', TestToast);
    fixture.detectChanges();

    const box = getHTMLElement<HTMLSpanElement>(fixture, '.info-box');
    const svg = getHTMLElement<MatIcon>(fixture, '.info-icon');
    const line = getHTMLElement<HTMLSpanElement>(fixture, '.time-line');

    expect(box).toBeTruthy();
    expect(svg).toBeTruthy();
    expect(line!.className).toContain('info-box');
  });

  it('U-Test-8: Toast type success should assign correct css classes in template', () => {
    TestToast.type = ToastType.SUCCESS;
    setInputSignal(fixture, 'toast', TestToast);
    fixture.detectChanges();

    const box = getHTMLElement<HTMLSpanElement>(fixture, '.success-box');
    const svg = getHTMLElement<MatIcon>(fixture, '.success-icon');
    const line = getHTMLElement<HTMLSpanElement>(fixture, '.time-line');

    expect(box).toBeTruthy();
    expect(svg).toBeTruthy();
    expect(line!.className).toContain('success-box');
  });

  it('U-Test-9: Toast lifetime type short assign correct css class in template', () => {
    TestToast.lifetime = ToastLifeTime.SHORT;
    setInputSignal(fixture, 'toast', TestToast);
    fixture.detectChanges();

    const line = getHTMLElement<HTMLSpanElement>(fixture, '.short-time');

    expect(line).toBeTruthy();
  });

  it('U-Test-10: Toast lifetime type long should assign correct css class in template', () => {
    TestToast.lifetime = ToastLifeTime.LONG;
    setInputSignal(fixture, 'toast', TestToast);
    fixture.detectChanges();

    const line = getHTMLElement<HTMLSpanElement>(fixture, '.long-time');

    expect(line).toBeTruthy();
  });

  it('U-Test-11: Toast lifetime type none should assign correct css class in template', () => {
    TestToast.lifetime = ToastLifeTime.NONE;
    setInputSignal(fixture, 'toast', TestToast);
    fixture.detectChanges();

    const line = getHTMLElement<HTMLSpanElement>(fixture, '.infinite-time');

    expect(line).toBeTruthy();
  });
});
