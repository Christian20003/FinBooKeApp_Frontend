/**
 * This interface represents a SVG icon.
 *
 * @property {string} name The name of the SVG icon to use with Angular-Materials
 * @property {string} path The path where the actual icon is stored.
 */
export interface Icon {
  name: string;
  path: string;
}

/**
 * This interface represents an icon dictionary, where the `name` of an
 * icon is used as key.
 */
export interface IconDictionary {
  [key: string]: Icon;
}
