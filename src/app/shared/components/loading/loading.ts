import { Component, input, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';
import { IconService } from '../../services/icon/icon-service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.html',
  styleUrls: ['./loading.scss'],
  imports: [TranslocoDirective, MatIcon],
})
export class LoadingComponent {
  // Dependency to register SVG icon
  private readonly iconService = inject(IconService);
  // The icon name
  protected readonly iconName = 'loading';
  // The message which should be displayed.
  readonly message = input<string>('');

  constructor() {
    this.iconService.registerIcon(this.iconName);
  }
}
