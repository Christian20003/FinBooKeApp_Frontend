import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import {
  TestToast,
  Toast,
  ToastRemoveType,
  ToastTypes,
} from 'src/app/shared/models/Toast';
import { getNativeElement } from 'src/app/testing/testing-support';
import { provideHttpClient } from '@angular/common/http';

describe('ToastComponent - Unit Tests', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  const setInput = (toast: Toast) => {
    fixture.componentRef.setInput('toast', toast);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    setInput(TestToast);
    fixture.detectChanges();
  });

  it('U-Test-1: Should create', () => {
    expect(component).withContext('Component should exist').toBeTruthy();
  });

  it('U-Test-2: With ToastRemoveType = SHORT it should call its remove function after 10 seconds', fakeAsync(() => {
    const removeCall = spyOn(component, 'onRemove');
    component.ngOnInit();
    tick(10000);
    expect(removeCall)
      .withContext('Should call the onRemove() function after 10 seconds')
      .toHaveBeenCalled();
  }));

  it('U-Test-3: With ToastRemoveType = LONG it should call its remove function after 15 seconds', fakeAsync(() => {
    const removeCall = spyOn(component, 'onRemove');
    const toast = { ...TestToast };
    toast.autoRemove = ToastRemoveType.LONG;
    setInput(toast);
    component.ngOnInit();
    tick(15000);
    expect(removeCall)
      .withContext('Should call the onRemove() function after 15 seconds')
      .toHaveBeenCalled();
  }));

  it('U-Test-3: With ToastRemoveType = NONE it should not call its remove function after some time', () => {
    const timeoutCall = spyOn(component, 'onRemove');
    const toast = { ...TestToast };
    toast.autoRemove = ToastRemoveType.NONE;
    setInput(toast);
    component.ngOnInit();
    expect(timeoutCall)
      .withContext('Timeout should not be initialised')
      .not.toHaveBeenCalled();
  });

  it('U-Test-5: Clicking close button should call the onRemove function', () => {
    const button = getNativeElement<ToastComponent, HTMLButtonElement>(
      fixture,
      '.close'
    );
    const removeCall = spyOn(component, 'onRemove');
    button.click();
    expect(removeCall)
      .withContext(
        'Clicking the close button should call the onRemove() function'
      )
      .toHaveBeenCalled();
  });

  it('U-Test-5: The remove function should call the remove emitter with the received toast object', () => {
    const removeEmit = spyOn(component.removeToast, 'emit');
    component.onRemove();
    expect(removeEmit)
      .withContext('The onRemove() function should call an emitter')
      .toHaveBeenCalledOnceWith(TestToast);
  });

  it('U-Test-6: An error toast should get error css classes', () => {
    const boxElement = getNativeElement<ToastComponent, HTMLSpanElement>(
      fixture,
      '.box'
    );
    const svgElement = getNativeElement<ToastComponent, HTMLOrSVGElement>(
      fixture,
      '.error-icon'
    );
    const lineElement = getNativeElement<ToastComponent, HTMLSpanElement>(
      fixture,
      '.time-line'
    );
    expect(svgElement).withContext('The error icon should appear').toBeTruthy();
    expect(boxElement.className)
      .withContext(
        'Class "error-box" should be in the class list of the <span class="box"> element'
      )
      .toContain('error-box');
    expect(lineElement.className)
      .withContext(
        'Class "error-box" should be in the class list of the <span class="time-line"> element'
      )
      .toContain('error-box');
  });

  it('U-Test-7: An warning toast should get warning css classes', () => {
    const toast = { ...TestToast };
    toast.type = ToastTypes.WARNING;
    setInput(toast);
    fixture.detectChanges();
    const boxElement = getNativeElement<ToastComponent, HTMLSpanElement>(
      fixture,
      '.box'
    );
    const svgElement = getNativeElement<ToastComponent, HTMLOrSVGElement>(
      fixture,
      '.warning-icon'
    );
    const lineElement = getNativeElement<ToastComponent, HTMLSpanElement>(
      fixture,
      '.time-line'
    );
    expect(svgElement)
      .withContext('The warning icon should appear')
      .toBeTruthy();
    expect(boxElement.className)
      .withContext(
        'Class "warning-box" should be in the class list of the <span class="box"> element'
      )
      .toContain('warning-box');
    expect(lineElement.className)
      .withContext(
        'Class "warning-box" should be in the class list of the <span class="time-line"> element'
      )
      .toContain('warning-box');
  });

  it('U-Test-8: An success toast should get success css classes', () => {
    const toast = { ...TestToast };
    toast.type = ToastTypes.SUCCESS;
    setInput(toast);
    fixture.detectChanges();
    const boxElement = getNativeElement<ToastComponent, HTMLSpanElement>(
      fixture,
      '.box'
    );
    const svgElement = getNativeElement<ToastComponent, HTMLOrSVGElement>(
      fixture,
      '.success-icon'
    );
    const lineElement = getNativeElement<ToastComponent, HTMLSpanElement>(
      fixture,
      '.time-line'
    );
    expect(svgElement)
      .withContext('The success icon should appear')
      .toBeTruthy();
    expect(boxElement.className)
      .withContext(
        'Class "success-box" should be in the class list of the <span class="box"> element'
      )
      .toContain('success-box');
    expect(lineElement.className)
      .withContext(
        'Class "success-box" should be in the class list of the <span class="time-line"> element'
      )
      .toContain('success-box');
  });

  it('U-Test-9: An abitrary toast should get info css classes', () => {
    const toast = { ...TestToast };
    toast.type = ToastTypes.NONE;
    setInput(toast);
    fixture.detectChanges();
    const boxElement = getNativeElement<ToastComponent, HTMLSpanElement>(
      fixture,
      '.box'
    );
    const svgElement = getNativeElement<ToastComponent, HTMLOrSVGElement>(
      fixture,
      '.info-icon'
    );
    const lineElement = getNativeElement<ToastComponent, HTMLSpanElement>(
      fixture,
      '.time-line'
    );
    expect(svgElement).withContext('The info icon should appear').toBeTruthy();
    expect(boxElement.className)
      .withContext(
        'Class "info-box" should be in the class list of the <span class="box"> element'
      )
      .toContain('info-box');
    expect(lineElement.className)
      .withContext(
        'Class "info-box" should be in the class list of the <span class="time-line"> element'
      )
      .toContain('info-box');
  });

  it('U-Test-10: With ToastRemoveType = SHORT the component should have a short lifing time-line', () => {
    const lineElement = getNativeElement<ToastComponent, HTMLSpanElement>(
      fixture,
      '.time-line'
    );
    expect(lineElement.className)
      .withContext(
        'Class "short-time" should be in the class list of the <span class="time-line"> element'
      )
      .toContain('short-time');
  });

  it('U-Test-11: With ToastRemoveType = LONG the component should have a long lifing time-line', () => {
    const toast = { ...TestToast };
    toast.autoRemove = ToastRemoveType.LONG;
    setInput(toast);
    fixture.detectChanges();
    const lineElement = getNativeElement<ToastComponent, HTMLSpanElement>(
      fixture,
      '.time-line'
    );
    expect(lineElement.className)
      .withContext(
        'Class "long-time" should be in the class list of the <span class="time-line"> element'
      )
      .toContain('long-time');
  });

  it('U-Test-12: With ToastRemoveType = NONE the component should have a permanent time-line', () => {
    const toast = { ...TestToast };
    toast.autoRemove = ToastRemoveType.NONE;
    setInput(toast);
    fixture.detectChanges();
    const lineElement = getNativeElement<ToastComponent, HTMLSpanElement>(
      fixture,
      '.time-line'
    );
    expect(lineElement.className)
      .withContext(
        'Class "long-time" should not be in the class list of the <span class="time-line"> element'
      )
      .not.toContain('long-time');
    expect(lineElement.className)
      .withContext(
        'Class "short-time" should not be in the class list of the <span class="time-line"> element'
      )
      .not.toContain('short-time');
  });
});
