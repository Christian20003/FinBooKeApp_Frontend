import {
  animate,
  animation,
  style,
  transition,
  trigger,
} from '@angular/animations';

/**
 * This variable defines a simple shrink animation with the height of an element. It will also
 * disappear with changing `opacity` value.
 * @param time    - Defines the time of the animation - e.g. "0.5s" (css syntax)
 */
export const shrinkHeight = animation([
  style({ opacity: 1, height: '*' }),
  animate('{{ time }} ease-out', style({ opacity: 0, height: 0 })),
]);

/**
 * This variable defines a simple grow and shrink animation. If the element should be displayed it will grow
 * and for leaving it will shrink.
 * @note IMPORTANT: The trigger name is ```growShrink```.
 */
export const growShrink = trigger('growShrink', [
  transition(':enter', [
    style({
      transform: 'scale(0)',
    }),
    animate('0.5s', style({ transform: 'scale(1)' })),
  ]),
  transition(':leave', [
    style({
      transform: 'scale(1)',
    }),
    animate('0.5s', style({ transform: 'scale(0)' })),
  ]),
]);
