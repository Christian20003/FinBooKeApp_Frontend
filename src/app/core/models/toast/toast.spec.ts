import { IToast } from './toast';
import { ToastLifeTime } from './toast-lifetime';
import { ToastType } from './toast-type';

/** A example object for a toast (usable for testing) */
export const TestToast: IToast = {
  id: 1,
  message: 'This is a test message',
  type: ToastType.ERROR,
  lifetime: ToastLifeTime.NONE,
};
