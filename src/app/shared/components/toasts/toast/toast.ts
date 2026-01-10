import { NgClass } from '@angular/common';
import {
  Component,
  input,
  OnInit,
  output,
  inject,
  OnDestroy,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  ICON_NAMES,
  IconService,
  IToast,
  ToastLifeTime,
  ToastType,
} from 'src/app/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  imports: [NgClass, MatIcon],
})
export class ToastComponent implements OnInit, OnDestroy {
  // Dependency to register SVG icons
  private readonly iconService = inject(IconService);
  // Time when the toast should remove itself
  private readonly shortLifetime = 10000;
  private readonly longLifetime = 15000;
  private lifetime!: ReturnType<typeof setTimeout>;
  // Names of all icons that must be registered
  protected readonly iconNames = ICON_NAMES;
  // The actual toast object
  readonly toast = input.required<IToast>();
  // An emitter to remove this child
  readonly remove = output<IToast>();

  constructor() {
    this.iconService.registerIcons([
      this.iconNames.info,
      this.iconNames.success,
      this.iconNames.warning,
      this.iconNames.error,
      this.iconNames.close,
    ]);
  }

  ngOnInit(): void {
    const lifetime = this.toast().lifetime;
    switch (lifetime) {
      case ToastLifeTime.LONG:
        this.lifetime = setTimeout(() => {
          this.onRemove();
        }, this.longLifetime);
        break;
      case ToastLifeTime.SHORT:
        this.lifetime = setTimeout(() => {
          this.onRemove();
        }, this.shortLifetime);
        break;
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.lifetime);
  }

  /**
   * This method triggers an emitter to remove itself from the toast list
   */
  onRemove(): void {
    this.remove.emit(this.toast());
  }

  /**
   * This method identifies, which css class should be selected for the background color of certain elements.
   * @returns The name of the corresponding css class.
   */
  getBoxColor(): string {
    const type = this.toast().type;
    switch (type) {
      case ToastType.ERROR:
        return 'error-box';
      case ToastType.SUCCESS:
        return 'success-box';
      case ToastType.WARNING:
        return 'warning-box';
      default:
        return 'info-box';
    }
  }

  /**
   * This method identifies, which css class should be selected for the color of the SVG icon.
   * @returns The name of the corresponding css class.
   */
  getIconColor(): string {
    const type = this.toast().type;
    switch (type) {
      case ToastType.ERROR:
        return 'error-icon';
      case ToastType.SUCCESS:
        return 'success-icon';
      case ToastType.WARNING:
        return 'warning-icon';
      default:
        return 'info-icon';
    }
  }

  /**
   * This method identifies, which css class should be selected for the time line animation.
   *
   * @returns The name of the corresponding css class.
   */
  getLifetime(): string {
    const lifetime = this.toast().lifetime;
    switch (lifetime) {
      case ToastLifeTime.LONG:
        return 'long-time';
      case ToastLifeTime.SHORT:
        return 'short-time';
      case ToastLifeTime.NONE:
        return 'infinite-time';
    }
  }

  /**
   * This method returns the name of the SVG icon.
   *
   * @returns The name of the SVG icon.
   */
  getSvgName(): string {
    const type = this.toast().type;
    switch (type) {
      case ToastType.SUCCESS:
        return this.iconNames.success;
      case ToastType.ERROR:
        return this.iconNames.error;
      case ToastType.WARNING:
        return this.iconNames.warning;
      default:
        return this.iconNames.info;
    }
  }
}
