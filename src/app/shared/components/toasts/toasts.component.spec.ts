import {
  provideZonelessChangeDetection,
  signal,
  WritableSignal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { ToastsComponent } from './toasts.component';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { TestToast, Toast } from 'src/app/shared/models/Toast';
import { getComponents } from 'src/app/testing/helper/get-component';

describe('ToastsComponent - Unit Tests', () => {
  let component: ToastsComponent;
  let fixture: ComponentFixture<ToastsComponent>;
  let toastService: jasmine.SpyObj<ToastService>;
  let store: WritableSignal<Toast[]>;

  beforeEach(() => {
    store = signal<Toast[]>([TestToast]);
    toastService = jasmine.createSpyObj('ToastService', ['removeToast'], {
      store: store.asReadonly(),
    });
    toastService.removeToast.and.callFake(id => {
      store.update(value => value.filter(toast => toast.id !== id));
    });

    TestBed.configureTestingModule({
      imports: [MockComponent(ToastComponent), ToastsComponent],
      providers: [provideZonelessChangeDetection()],
    });
    TestBed.overrideProvider(ToastService, { useValue: toastService });

    fixture = TestBed.createComponent(ToastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-Test-1: Component should exist', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test-2: Component should have read the state from the toast service', () => {
    // @ts-expect-error Get the toast list state from component
    const state = component.toasts;

    expect(state()).toHaveSize(store().length);
    expect(state()).toContain(TestToast);
  });

  it('U-Test-3: Component should display correct number of toast components', () => {
    const elements = getComponents<ToastComponent>(fixture, ToastComponent);

    expect(elements).toHaveSize(store().length);
  });

  it('U-Test-4: Component should remove toast', () => {
    component.onRemoveToast(TestToast);
    fixture.detectChanges();

    // @ts-expect-error Get the toast list state from component
    const state = component.toasts;
    const elements = getComponents<ToastComponent>(fixture, ToastComponent);

    expect(elements).toHaveSize(0);
    expect(state()).toHaveSize(0);
  });
});
