import { Component, inject, signal } from '@angular/core';
import { Toast } from 'src/app/shared/models/Toast';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss',
  imports: [ToastComponent],
})
export class ToastsComponent {
  // Dependency to get toast store
  private readonly toastService = inject(ToastService);
  // A list of toasts which should be displayed
  protected toasts = signal<Toast[]>([]).asReadonly();

  constructor() {
    this.toasts = this.toastService.store;
  }

  /**
   * This function removes a toast from the `toasts` list as well as from the {@link ToastService}
   * @param toast     The toast which should be removed
   */
  public onRemoveToast(toast: Toast) {
    this.toastService.removeToast(toast.id);
  }
}
