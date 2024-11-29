import {
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

/**
 * This variable defines a simple slide-out animation (vertically). It has the following parameters:
 * @param time    - Defines the time of the animation - e.g. "0.5s" (css syntax)
 * @param length  - Defines the moving points on the y-axis - e.g. "-50px" (css syntax)
 */
export const slideOutY = animation([
  style({
    transform: 'translateY(0px)',
    opacity: 1,
  }),
  animate(
    '{{ time }} ease-in',
    style({
      transform: 'translateY({{ length }})',
      opacity: '0',
    })
  ),
]);

/**
 * This variable defines a simple slide-in animation (vertically). It has the following parameters:
 * @param time    - Defines the time of the animation - e.g. "0.5s" (css syntax)
 * @param length  - Defines the moving points on the y-axis - e.g. "-50px" (css syntax)
 */
export const slideInY = animation([
  style({
    transform: 'translateY({{ length }})',
    opacity: '0',
  }),
  animate(
    '{{ time }} ease-out',
    style({
      transform: 'translateY(0px)',
      opacity: '1',
    })
  ),
]);

/**
 * This variable defines a simple moving animation from top to bottom if the corresponding element is intialized as well as
 * if it is destroyed.
 * IMPORTANT: The trigger name is "moveDown".
 */
export const moveDown = trigger('moveDown', [
  transition(':enter', [
    useAnimation(slideInY, {
      params: {
        length: '-50px',
        time: '1s',
      },
    }),
  ]),
  transition(':leave', [
    useAnimation(slideOutY, {
      params: {
        length: '50px',
        time: '0.5s',
      },
    }),
    animate('0.5s', style({ height: '0px' })),
  ]),
]);
