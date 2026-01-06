import { TestBed } from '@angular/core/testing';
import {
  provideZonelessChangeDetection,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  TestToast,
  Toast,
  ToastLifeTime,
  ToastType,
} from 'src/app/shared//models/Toast';
import { ToastService } from './toast-service';

describe('ToastService - Unit Tests', () => {
  let service: ToastService;
  let store: WritableSignal<Toast[]>;
  const toast = {
    message: 'Message',
    type: ToastType.SUCCESS,
    lifetime: ToastLifeTime.SHORT,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(ToastService);
    store = signal<Toast[]>([TestToast]);
    // @ts-expect-error Access private member to override start state
    service.list = store;
  });

  it('U-Test-1: Adding a new toast should extend the toast store', () => {
    service.addToast(toast.message, toast.type, toast.lifetime);
    const last = store().at(-1);

    expect(last).toBeTruthy();
    expect(last!.message).toBe(toast.message);
    expect(last!.type).toBe(toast.type);
    expect(last!.lifetime).toBe(toast.lifetime);
  });

  it('U-Test-2: Added toast should receive unique id', () => {
    service.addToast(toast.message, toast.type, toast.lifetime);
    const last = store().at(-1);
    const id = last!.id;

    expect(store().filter(toast => toast.id === id)).toHaveSize(1);
  });

  it('U-Test-3: Removing a toast should reduce the toast store ', () => {
    service.removeToast(TestToast.id);

    expect(store()).not.toContain(TestToast);
  });

  it('U-Test-4: Removing a not existing toast should do nothing', () => {
    const size = store().length;
    service.removeToast(55);

    expect(store()).toHaveSize(size);
  });
});
