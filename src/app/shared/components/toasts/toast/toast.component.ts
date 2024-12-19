import { NgClass } from '@angular/common';
import {
  Component,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Toast, ToastRemoveType, ToastTypes } from 'src/app/shared';

@Component({
  selector: 'app-toast',
  imports: [NgClass, MatIcon],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  /** The actual toast object */
  public readonly toast: InputSignal<Toast> = input.required();
  /** The enumeration of all possible toast types */
  public readonly types = ToastTypes;
  /** An emitter to inform the parent component to remove this child */
  public readonly removeToast: OutputEmitterRef<Toast> = output();

  public constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'error',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/error.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'success',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/success.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'warning',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/warning.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'info',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/info.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'close',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/close.svg'
      )
    );
  }

  public ngOnInit(): void {
    const removeType = this.toast().autoRemove;
    switch (removeType) {
      case ToastRemoveType.LONG:
        setTimeout(() => {
          this.onRemove();
        }, 15000);
        break;
      case ToastRemoveType.SHORT:
        setTimeout(() => {
          this.onRemove();
        }, 10000);
        break;
    }
  }

  /**
   * This function triggers an emitter to remove itself from the toast list
   */
  public onRemove(): void {
    this.removeToast.emit(this.toast());
  }

  /**
   * This function identifies according to the toast type, which css class should be selected
   * for the background color of certain elements.
   * @returns The name of the corresponding css class
   */
  public getColor(): string {
    const type = this.toast().type;
    switch (type) {
      case this.types.ERROR:
        return 'error-box';
      case this.types.SUCCESS:
        return 'success-box';
      case this.types.WARNING:
        return 'warning-box';
      default:
        return 'info-box';
    }
  }

  /**
   * This function identifies according to the toast remove type, which css class should be
   * selected for the time line animation.
   * @returns The name of the corresponding css class
   */
  public getRemoveTime(): string {
    const removeType = this.toast().autoRemove;
    switch (removeType) {
      case ToastRemoveType.LONG:
        return 'long-time';
      case ToastRemoveType.SHORT:
        return 'short-time';
      case ToastRemoveType.NONE:
        return 'infinite-time';
    }
  }
}
