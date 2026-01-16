import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * This function returns a single component (e.g. subcomponents) from the current DOM structure of the application. It is necessary to specify
 * type `R` which defines the kind of angular-component.
 *
 * @param fixture A component fixture.
 * @param type The type of the component which should be returned.
 * @returns Returns a component of that given type. If the component could not be found, it will return null.
 */
export const getComponent = <R>(
  fixture: ComponentFixture<unknown>,
  type: Type<R>
): R | null => {
  const element = fixture.debugElement.query(By.directive(type));
  return element?.componentInstance as R;
};

/**
 * This function returns multiple components (e.g. subcomponents) from the current DOM structure of the application. It is necessary to specify
 * type `R` which defines the kind of angular-component. All components should be of same type.
 *
 * @param fixture A component fixture.
 * @param type The type of the component which should be returned.
 * @returns Returns a list of components of that given type.
 */
export const getComponents = <R>(
  fixture: ComponentFixture<unknown>,
  type: Type<R>
): R[] => {
  const components = fixture.debugElement.queryAll(By.directive(type));
  const result: R[] = [];
  components.forEach(component =>
    result.push(component.componentInstance as R)
  );
  return result;
};
