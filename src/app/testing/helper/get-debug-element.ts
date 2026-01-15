import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * This function returns a debug element from the current DOM structure of the application.
 *
 * @param fixture A component fixture.
 * @param selector A string which defines a CSS selector to get a specific debug element.
 * @returns Returns the debug element.
 */
export const getDebugElement = (
  fixture: ComponentFixture<unknown>,
  selector: string
): DebugElement => {
  return fixture.debugElement.query(By.css(selector));
};
