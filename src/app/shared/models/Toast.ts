/** A list of all possible toast types */
export enum ToastTypes {
  ERROR,
  WARNING,
  SUCCESS,
  NONE,
}

/** A list of remove types which defines, how long the toast should exist */
export enum ToastRemoveType {
  SHORT,
  LONG,
  NONE,
}

/**
 * This interface describes the structure of a toast object (little notification).
 * @property {number} id - The id of the toast
 * @property {string} message - The message of the toast
 * @property {ToastTypes} type - The type of the toast
 * @property {ToastRemoveType} autoRemove - Amount of time (in seconds) in which this toast exist. `-1` if infinite
 */
export interface Toast {
  id: number;
  message: string;
  type: ToastTypes;
  autoRemove: ToastRemoveType;
}

/** A example object for a toast (usable for testing) */
export const TestToast: Toast = {
  id: 1,
  message: 'This is a test message',
  type: ToastTypes.ERROR,
  autoRemove: ToastRemoveType.SHORT,
};
