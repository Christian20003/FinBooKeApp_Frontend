import { Component, inject, signal } from '@angular/core';
import { IToast, ToastService } from 'src/app/core';
import { ToastComponent } from './toast/toast';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.html',
  styleUrl: './toasts.scss',
  imports: [ToastComponent],
})
export class ToastsComponent {
  // Dependency to get toast store
  private readonly toastService = inject(ToastService);
  // A list of toasts which should be displayed
  protected toasts = signal<IToast[]>([]).asReadonly();

  constructor() {
    this.toasts = this.toastService.store;
  }

  /**
   * This function removes a toast from the `toasts` list as well as from the {@link ToastService}
   * @param toast     The toast which should be removed
   */
  public onRemoveToast(toast: IToast) {
    this.toastService.removeToast(toast.id);
  }
}
