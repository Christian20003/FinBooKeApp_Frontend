import { ComponentFixture } from '@angular/core/testing';

/**
 * This function sets a input signal with the provided value.
 *
 * @param fixture A component fixture object of type T.
 * @param name The name of the input signal in the component.
 * @param value The value to which the signal should be set.
 */
export const setInputSignal = <T, R>(
  fixture: ComponentFixture<T>,
  name: string,
  value: R
): void => {
  fixture.componentRef.setInput(name, value);
};
