import { Component } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Toast } from '../../models/Toast';
import { slideInY } from '../..';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss',
  animations: [
    trigger('moveDown', [
      transition(':enter', [
        useAnimation(slideInY, {
          params: {
            length: '-50px',
            time: '1s',
          },
        }),
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('300ms ease-out', style({ opacity: 0, height: 0 })),
      ]),
    ]),
  ],
})
export class ToastsComponent {
  public toasts: Toast[] = [];

  constructor(private service: ToastService) {
    this.service.toastStore$.subscribe(data => {
      this.toasts = data;
    });
  }

  onRemoveToast(toast: Toast) {
    this.service.removeToast(toast.id);
  }
}
