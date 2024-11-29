import {
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

/**
 * This variable defines a simple slide-out animation (horizontally). It has the following parameters:
 * @param time    - Defines the time of the animation - e.g. "0.5s" (css syntax)
 * @param length  - Defines the moving points on the x-axis - e.g. "-50px" (css syntax)
 */
export const slideOutX = animation([
  style({
    transform: 'translateX(0px)',
    opacity: 1,
  }),
  animate(
    '{{ time }} ease-in',
    style({
      transform: 'translateX({{ length }})',
      opacity: '0',
    })
  ),
]);

/**
 * This variable defines a simple slide-in animation (horizontally). It has the following parameters:
 * @param time    - Defines the time of the animation - e.g. "0.5s" (css syntax)
 * @param length  - Defines the moving points on the x-axis - e.g. "-50px" (css syntax)
 */
export const slideInX = animation([
  style({
    transform: 'translateX({{ length }})',
    opacity: '0',
  }),
  animate(
    '{{ time }} ease-out',
    style({
      transform: 'translateX(0px)',
      opacity: '1',
    })
  ),
]);

/**
 * This variable defines a simple moving animation from left to right if the corresponding element is intialized as well as
 * if it is destroyed.
 * IMPORTANT: The trigger name is "moveLeftToRight".
 */
export const moveLeftToRight = trigger('moveLeftToRight', [
  transition(':enter', [
    useAnimation(slideInX, {
      params: {
        length: '-50px',
        time: '1s',
      },
    }),
  ]),
  transition(':leave', [
    useAnimation(slideOutX, {
      params: {
        length: '50px',
        time: '0.5s',
      },
    }),
    animate('0.5s', style({ height: '0px' })),
  ]),
]);

/**
 * This variable defines a simple moving animation from right to left if the corresponding element is intialized as well as
 * if it is destroyed.
 * IMPORTANT: The trigger name is "moveRightToLeft".
 */
export const moveRightToLeft = trigger('moveRightToLeft', [
  transition(':enter', [
    useAnimation(slideInX, {
      params: {
        length: '100px',
        time: '1s',
      },
    }),
  ]),
  transition(':leave', [
    useAnimation(slideOutX, {
      params: {
        length: '-50px',
        time: '0.5s',
      },
    }),
  ]),
]);
