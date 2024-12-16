import { Component, input, InputSignal } from '@angular/core';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslocoDirective } from '@ngneat/transloco';
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
  public readonly message: InputSignal<string> = input('');

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'coins',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/coins.svg'
      )
    );
  }
}
