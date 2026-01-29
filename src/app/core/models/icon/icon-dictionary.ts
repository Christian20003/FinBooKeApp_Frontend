import { IIcon } from './icon';

/**
 * This interface represents an icon dictionary, where the `name` of an
 * icon is used as key.
 */
export type IconDictionary = {
  [key: string]: IIcon;
};
