import { Component, inject, signal } from '@angular/core';
import { IToast, ToastService } from 'src/app/core';
import { Toast } from './toast/toast';

/**
 * This component is responsible for displaying toasts in the application.
 * It uses the {@link ToastService} to manage the list of toasts and provides
 * functionality to remove individual toasts.
 */
@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.html',
  styleUrl: './toasts.scss',
  imports: [Toast],
})
export class Toasts {
  private readonly toastService = inject(ToastService);
  protected toasts = signal<IToast[]>([]).asReadonly();

  constructor() {
    this.toasts = this.toastService.store;
  }

  /**
   * This function removes a toast from the `toasts` list as well as from the {@link ToastService}
   * @param toast The toast which should be removed
   */
  protected onRemoveToast(toast: IToast) {
    this.toastService.removeToast(toast.id);
  }
}
