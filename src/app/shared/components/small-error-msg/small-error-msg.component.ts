import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-error-msg',
  templateUrl: './small-error-msg.component.html',
  styleUrls: ['./small-error-msg.component.scss'],
  standalone: false,
})
export class SmallErrorMsgComponent {
  @Input() message = '';
}
