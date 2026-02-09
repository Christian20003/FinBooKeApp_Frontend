import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';

/**
 * This directive emits `clickOutside` if the user clicks outside
 * its host element.
 */
@Directive({
  selector: '[appOnClickOutside]',
})
export class OnClickOutside {
  private element = inject(ElementRef);

  readonly clickOutside = output<void>();

  @HostListener('document:click', ['$event.target'])
  onClick(target: EventTarget | null): void {
    if (
      !(target instanceof Node) ||
      !this.element.nativeElement.contains(target)
    ) {
      this.clickOutside.emit();
    }
  }
}
