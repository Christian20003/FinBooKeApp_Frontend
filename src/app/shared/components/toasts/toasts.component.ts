import { Component } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Toast } from '../../models/Toast';
import { shrinkHeight, slideInY } from '../..';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss',
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        useAnimation(slideInY, {
          params: {
            length: '-50px',
            time: '1s',
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(shrinkHeight, {
          params: {
            time: '0.3s',
          },
        }),
      ]),
    ]),
  ],
  standalone: false,
})
export class ToastsComponent {
  /** A list of toasts which should be displayed */
  public toasts: Toast[] = [];

  constructor(private toastService: ToastService) {
    this.toastService.toastStore$.subscribe(data => {
      this.toasts = data;
    });
  }

  /**
   * This function removes a toast from the `toasts` list as well as from the {@link ToastService}
   * @param toast     The toast which should be removed
   */
  onRemoveToast(toast: Toast) {
    this.toastService.removeToast(toast.id);
  }
}
