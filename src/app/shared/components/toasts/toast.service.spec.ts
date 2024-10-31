import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { BehaviorSubject } from 'rxjs';
import { TestToast } from '../../models/Toast';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('U-Test-1: Create the ToastService', () => {
    expect(service).withContext('Service should exist').toBeTruthy();
  });

  it('U-Test-2: Call the getter for the toast list', () => {
    // @ts-expect-error Access private member to override start state
    service.toastStore = new BehaviorSubject<Toast[]>([TestToast]);
    // @ts-expect-error To be able of testing the getter function
    const result = service.toasts;
    expect(result)
      .withContext(
        'The resulting toast list should only contain a single value'
      )
      .toHaveSize(1);
    expect(result)
      .withContext(
        'The element inside the toast list should have the following content'
      )
      .toContain(TestToast);
  });

  it('U-Test-3: Call the setter for the toast list', () => {
    // @ts-expect-error To be able of testing the setter function
    service.toasts = [TestToast];
    // @ts-expect-error To be independent from the getter function and get the actual state
    const result = service.toastStore.getValue();
    expect(result)
      .withContext(
        'The resulting toast list should only contain a single value'
      )
      .toHaveSize(1);
    expect(result)
      .withContext(
        'The element inside the toast list should have the following content'
      )
      .toContain(TestToast);
  });

  it('U-Test-4: Add a new toast to the toast list', () => {
    service.addToast(TestToast.message, TestToast.type, TestToast.autoRemove);
    // @ts-expect-error To be independent from the getter function and get the actual state
    const result = service.toastStore.getValue();
    // @ts-expect-error To be able of testing correct id assignment
    const counter = service.idCounter;
    expect(result)
      .withContext(
        'The resulting toast list should only contain a single value'
      )
      .toHaveSize(1);
    expect(result)
      .withContext(
        'The element inside the toast list should have the following content'
      )
      .toContain(TestToast);
    expect(counter).withContext('The id counter should increment').toBe(2);
  });

  it('U-Test-5: Remove an existing toast from the toast list', () => {
    // @ts-expect-error Access private member to override start state
    service.toastStore = new BehaviorSubject<Toast[]>([TestToast]);
    service.removeToast(TestToast.id);
    // @ts-expect-error To be independent from the getter function and get the actual state
    const result = service.toastStore.getValue();
    expect(result)
      .withContext('The resulting toast list should be empty')
      .toHaveSize(0);
  });

  it('U-Test-6: Remove a not existing toast from the toast list', () => {
    // @ts-expect-error Access private member to override start state
    service.toastStore = new BehaviorSubject<Toast[]>([TestToast]);
    service.removeToast(55);
    // @ts-expect-error To be independent from the getter function and get the actual state
    const result = service.toastStore.getValue();
    expect(result)
      .withContext('The resulting toast list should contain a single value')
      .toHaveSize(1);
    expect(result)
      .withContext(
        'The element inside the toast list should have the following content'
      )
      .toContain(TestToast);
  });
});
