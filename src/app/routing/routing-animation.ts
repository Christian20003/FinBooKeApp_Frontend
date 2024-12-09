import {
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { slideInX, slideOutX } from '../shared';

export const routingAnimation = trigger('routeAnimation', [
  transition('AuthenticationPage <=> DashboardPage', [
    style({ display: 'grid', position: 'relative' }),
    query(':leave', [animateChild()]),
    group([
      query(':enter', [
        useAnimation(slideInX, {
          params: {
            length: '-50px',
            time: '1s',
          },
        }),
      ]),
      query(':leave', [
        style({ position: 'absolute', width: '100%' }),
        useAnimation(slideOutX, {
          params: {
            length: '50px',
            time: '0.5s',
          },
        }),
      ]),
    ]),
  ]),
]);
