import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast, ToastRemoveType, ToastTypes } from '../../models/Toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /** Object storing toast objects currently shown to the user */
  private readonly toastStore: BehaviorSubject<Toast[]> = new BehaviorSubject<
    Toast[]
  >([]);
  /** Counter for assigning an id to a new toast object */
  private idCounter: number = 1;
  /** Observable to subscribe the toast store and being notified about updates */
  public readonly toastStore$: Observable<Toast[]> =
    this.toastStore.asObservable();

  /**
   * This function returns the current state of the toast store
   * @return      A list of {@link Toast} objects
   */
  private get toasts(): Toast[] {
    return this.toastStore.getValue();
  }

  /**
   * This function sets the new state of the toast store
   * @param list  A list of {@link Toast} objects
   */
  private set toasts(list: Toast[]) {
    this.toastStore.next(list);
  }

  /**
   * This function adds a new {@link Toast} to the toast store.
   * @param message       The message of the toast
   * @param type          The type of the toast
   * @param removeType    The auto remove option for this toast
   */
  addToast(message: string, type: ToastTypes, removeType: ToastRemoveType) {
    const toast = {
      id: this.idCounter,
      message: message,
      type: type,
      autoRemove: removeType,
    };
    this.toasts = [...this.toasts, toast];
    this.idCounter++;
  }

  /**
   * This function removes a {@link Toast} with the given `id` from the toast store.
   * If the `id` does not correspond to any {@link Toast} in the toast store, nothing will happen.
   * @param id          The id of the {@link Toast} which should be removed.
   */
  removeToast(id: number) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }
}
