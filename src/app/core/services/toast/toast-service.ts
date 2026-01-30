import { computed, Injectable, signal } from '@angular/core';
import { IToast } from 'src/app/core/models/toast/toast';
import { ToastLifeTime, ToastType } from 'src/app/core/models';

/**
 * Service to manage toast notifications within the application.
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly list = signal<IToast[]>([]);
  readonly store = computed(() => this.list());

  /**
   * This function adds a new {@link Toast} to the toast store.
   * @param message The message of the toast
   * @param type The type of the toast
   * @param lifetime When the toast should be removed
   */
  addToast(message: string, type: ToastType, lifetime: ToastLifeTime) {
    const toast = {
      id: this.list().length + 1,
      message: message,
      type: type,
      lifetime: lifetime,
    };
    this.list.update(list => [...list, toast]);
  }

  /**
   * This function removes a {@link Toast} with the given `id` from the toast store.
   * If the `id` does not correspond to any {@link Toast} in the toast store, nothing will happen.
   * @param id          The id of the {@link Toast} which should be removed.
   */
  removeToast(id: number) {
    this.list.update(list => list.filter(toast => toast.id !== id));
  }
}
