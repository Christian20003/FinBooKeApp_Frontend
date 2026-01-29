import { ToastLifeTime } from './toast-lifetime';
import { ToastType } from './toast-type';

/**
 * This interface describes the structure of a toast object (little notification).
 * @property {number} id - The id of the toast
 * @property {string} message - The message of the toast
 * @property {ToastTypes} type - The type of the toast
 * @property {ToastRemoveType} lifetime - Amount of time (in seconds) in which this toast exist. `-1` if infinite
 */
export interface IToast {
  id: number;
  message: string;
  type: ToastType;
  lifetime: ToastLifeTime;
}
