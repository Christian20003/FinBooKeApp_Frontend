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

/**
 * This component represents a single toast message that can be displayed to the user.
 * It includes functionality for displaying different types of toasts (info, success, warning, error)
 * and automatically removes itself after a specified lifetime.
 */
@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  imports: [NgClass, MatIcon],
})
export class ToastComponent implements OnInit, OnDestroy {
  private readonly iconService = inject(IconService);
  private readonly shortLifetime = 10000;
  private readonly longLifetime = 15000;
  private lifetime!: ReturnType<typeof setTimeout>;
  protected readonly iconNames = ICON_NAMES;

  readonly toast = input.required<IToast>();
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
   *
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
   *
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
      default:
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
