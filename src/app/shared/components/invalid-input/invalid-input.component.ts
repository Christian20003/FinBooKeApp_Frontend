import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invalid-input',
  templateUrl: './invalid-input.component.html',
  styleUrls: ['./invalid-input.component.scss'],
  standalone: false,
})
export class InvalidInputComponent {
  @Input() message = '';
}
