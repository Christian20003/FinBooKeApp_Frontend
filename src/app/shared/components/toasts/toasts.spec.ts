import {
  provideZonelessChangeDetection,
  signal,
  WritableSignal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { Toasts } from './toasts';
import { Toast } from './toast/toast';
import { ToastService, IToast } from 'src/app/core';
import {
  getComponent,
  getComponents,
} from 'src/app/testing/helper/get-component';
import { TestToast } from 'src/app/core/index.spec';

describe('Toasts - Unit Tests', () => {
  let component: Toasts;
  let fixture: ComponentFixture<Toasts>;
  let toastService: jasmine.SpyObj<ToastService>;
  let store: WritableSignal<IToast[]>;

  beforeEach(() => {
    store = signal<IToast[]>([TestToast]);
    toastService = jasmine.createSpyObj('ToastService', ['removeToast'], {
      store: store.asReadonly(),
    });
    toastService.removeToast.and.callFake(id => {
      store.update(value => value.filter(toast => toast.id !== id));
    });

    TestBed.configureTestingModule({
      imports: [MockComponent(Toast), Toasts],
      providers: [provideZonelessChangeDetection()],
    });
    TestBed.overrideProvider(ToastService, { useValue: toastService });

    fixture = TestBed.createComponent(Toasts);
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
    const elements = getComponents<Toast>(fixture, Toast);

    expect(elements).toHaveSize(store().length);
  });

  it('U-Test-4: Component should remove toast', async () => {
    const toast = getComponent(fixture, Toast)!;
    toast.remove.emit(TestToast);
    await fixture.whenStable();

    // @ts-expect-error Get the toast list state from component
    const state = component.toasts;
    const elements = getComponents<Toast>(fixture, Toast);

    expect(elements).toHaveSize(0);
    expect(state()).toHaveSize(0);
  });
});
