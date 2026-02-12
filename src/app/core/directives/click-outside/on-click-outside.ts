import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';

/**
 * This directive emits `clickOutside` if the user clicks or push enter
 * outside its host element.
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

  @HostListener('document:keydown.enter', ['$event.target'])
  onEnter(target: EventTarget | null): void {
    if (
      !(target instanceof Node) ||
      !this.element.nativeElement.contains(target)
    ) {
      this.clickOutside.emit();
    }
  }
}
