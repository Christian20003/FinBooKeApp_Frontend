import { Component, input, InputSignal } from '@angular/core';
import { growShrink } from '../../animations/growShrink';
import { moveLeftToRight } from '../../animations/slideLeftRight';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [growShrink, moveLeftToRight],
  standalone: false,
})
export class LoadingComponent {
  public readonly message: InputSignal<string> = input('');
  public readonly text = {
    title: 'Laden...',
  };
}
