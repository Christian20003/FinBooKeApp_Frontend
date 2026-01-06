/** A list of all possible toast types */
export const enum ToastType {
  ERROR = 'Error',
  WARNING = 'Warning',
  SUCCESS = 'Success',
  INFO = 'Info',
  NONE = 'None',
}

/** A list of lifetimes which defines, how long the toast should exist */
export const enum ToastLifeTime {
  SHORT = 'Short',
  LONG = 'Long',
  NONE = 'None',
}

/**
 * This interface describes the structure of a toast object (little notification).
 * @property {number} id - The id of the toast
 * @property {string} message - The message of the toast
 * @property {ToastTypes} type - The type of the toast
 * @property {ToastRemoveType} lifetime - Amount of time (in seconds) in which this toast exist. `-1` if infinite
 */
export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  lifetime: ToastLifeTime;
}

/** A example object for a toast (usable for testing) */
export const TestToast: Toast = {
  id: 1,
  message: 'This is a test message',
  type: ToastType.ERROR,
  lifetime: ToastLifeTime.NONE,
};
