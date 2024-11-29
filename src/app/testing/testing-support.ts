import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * This function returns an native HTML-Element from the current DOM structure of the application. It is necessary to define
 * the type-T of the {@link ComponentFixture} object (should be the name of the component where this function is called) and
 * the type-R which defines the kind of HTML-Element (e.g. {@link HTMLButtonElement}).
 *
 * @param fixture       A component fixture object of type T
 * @param selector      A string which defines a CSS selector to get a specific HTML-Element
 * @returns             Returns the HTML-Element of type R. If the HTML-Element could not be found it returns undefined or if there
 *                      are more than one HTML-Element it will only return the first one (otherwise use {@link getNativeElements}).
 */
export const getNativeElement = <T, R>(
  fixture: ComponentFixture<T>,
  selector: string
): R => {
  const debugElem = fixture.debugElement.query(By.css(selector));
  return debugElem?.nativeNode as R;
};

/**
 * This function returns a list of native HTML-Elements from the current DOM structure of the application. It is necessary to define
 * the type-T of the {@link ComponentFixture} object (should be the name of the component where this function is called) and
 * the type-R which defines the kind of HTML-Elements (e.g. {@link HTMLButtonElement}).
 *
 * @param fixture        A component fixture object of type T
 * @param selector       A string which defines a CSS selector to get a list of HTML-Elements
 * @returns              Returns a list of HTML-Elements of type R. If the HTML-Elements could not be found it the list will be empty.
 */
export const getNativeElements = <T, R>(
  fixture: ComponentFixture<T>,
  selector: string
): R[] => {
  const debugElements = fixture.debugElement.queryAll(By.css(selector));
  const result: R[] = [];
  for (const element of debugElements) {
    result.push(element.nativeNode as R);
  }
  return result;
};

/**
 * This function returns a single component (e.g. subcomponents) from the current DOM structure of the application. It is necessary to define
 * the type-T of the {@link ComponentFixture} object (should be the name of the component where this function is called) and
 * the type-R which defines the kind of angular-component.
 *
 * @param fixture       A component fixture object of type T
 * @param type          The type of the component which should be returned
 * @returns             Returns a component of that given type. If the component could not be found, it will return undefined.
 */
export const getComponent = <T, R>(
  fixture: ComponentFixture<T>,
  type: Type<R>
): DebugElement => {
  return fixture.debugElement.query(By.directive(type));
};

/**
 * This function returns multiple components (e.g. subcomponents) from the current DOM structure of the application. It is necessary to define
 * the type-T of the {@link ComponentFixture} object (should be the name of the component where this function is called) and
 * the type-R which defines the kind of angular-component. All components should be of same type.
 *
 * @param fixture       A component fixture object of type T
 * @param type          The type of the component which should be returned
 * @returns             Returns a list of components of that given type. If a component could not be found, it will return undefined.
 */
export const getComponents = <T, R>(
  fixture: ComponentFixture<T>,
  type: Type<R>
): DebugElement[] => {
  return fixture.debugElement.queryAll(By.directive(type));
};

/**
 * This function triggers the 'input' and 'blur' event for a list of {@link HTMLInputElement} objects.
 *
 * @param elements      A list of {@link HTMLInputElement} objects to which both events should be triggerd
 */
export const triggerInput = (elements: HTMLInputElement[]): void => {
  const events = ['input', 'blur'];
  for (const element of elements) {
    for (const event of events) {
      element.dispatchEvent(new Event(event));
    }
  }
};
