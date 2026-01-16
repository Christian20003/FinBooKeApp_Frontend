import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * This function returns an native HTML-Element from the current DOM structure of the application. It is necessary to specify
 * the type `R` which defines the kind of HTML-Element (e.g. {@link HTMLButtonElement}).
 *
 * @param fixture A component fixture.
 * @param selector A string which defines a CSS selector to get a specific HTML-Element.
 * @returns Returns the HTML-Element of type `R`. If the HTML-Element could not be found it returns undefined or if there
 * are more than one HTML-Element it will only return the first one (otherwise use {@link getHTMLElements}).
 */
export const getHTMLElement = <R>(
  fixture: ComponentFixture<unknown>,
  selector: string
): R | undefined => {
  const debugElem = fixture.debugElement.query(By.css(selector));
  return debugElem?.nativeNode as R;
};

/**
 * This function returns a list of native HTML-Elements from the current DOM structure of the application. It is necessary to specify
 * the type `R` which defines the kind of HTML-Elements (e.g. {@link HTMLButtonElement}).
 *
 * @param fixture A component fixture.
 * @param selector A string which defines a CSS selector to get a list of HTML-Elements.
 * @returns Returns a list of HTML-Elements of type `R`. If the HTML-Elements could not be found it the list will be empty.
 */
export const getHTMLElements = <R>(
  fixture: ComponentFixture<unknown>,
  selector: string
): R[] => {
  const debugElements = fixture.debugElement.queryAll(By.css(selector));
  const result: R[] = [];
  for (const element of debugElements) {
    result.push(element.nativeNode as R);
  }
  return result;
};
