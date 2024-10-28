import { Component } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Toast, ToastRemoveType, ToastTypes } from '../../models/Toast';
import { slideInY } from '../..';

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
  test: Toast[] = [
    {
      id: 1,
      message: 'Hello World',
      type: ToastTypes.ERROR,
      autoRemove: ToastRemoveType.NONE,
    },
    {
      id: 2,
      message: 'Das war ein Erfolg',
      type: ToastTypes.SUCCESS,
      autoRemove: ToastRemoveType.SHORT,
    },
    {
      id: 3,
      message: 'Warning',
      type: ToastTypes.WARNING,
      autoRemove: ToastRemoveType.SHORT,
    },
    {
      id: 3,
      message:
        'Das hier ist ein Info text und ich versuche in so lange wie möglich zu machen. Nun habe ich noch weitere dinge zu erwähnen',
      type: ToastTypes.NONE,
      autoRemove: ToastRemoveType.SHORT,
    },
  ];
  value = 2;

  onAdd() {
    const value = {
      id: 4,
      message: 'This is a new toast',
      type: ToastTypes.ERROR,
      autoRemove: ToastRemoveType.LONG,
    };
    this.test.push(value);
  }

  onRemoveToast(toast: Toast) {
    const index = this.test.indexOf(toast);
    this.test.splice(index, 1);
  }
}
