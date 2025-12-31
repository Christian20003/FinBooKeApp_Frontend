import { Component, input, InputSignal, inject } from '@angular/core';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslocoDirective } from '@jsverse/transloco';
import { growShrink } from '../../animations/growShrink';
import { moveLeftToRight } from '../../animations/slideLeftRight';

@Component({
  selector: 'app-loading',
  imports: [TranslocoDirective, MatIcon],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [growShrink, moveLeftToRight],
})
export class LoadingComponent {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  public readonly message: InputSignal<string> = input('');

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'coins',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/coins.svg'
      )
    );
  }
}
