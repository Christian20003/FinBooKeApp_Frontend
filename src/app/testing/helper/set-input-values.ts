/**
 * This function triggers the 'input' and 'blur' event for a list of {@link HTMLInputElement} objects.
 *
 * @param elements      A list of {@link HTMLInputElement} objects to which both events should be triggerd
 */
export const setInputValues = (elements: HTMLInputElement[]): void => {
  const events = ['input', 'blur'];
  for (const element of elements) {
    for (const event of events) {
      element.dispatchEvent(new Event(event));
    }
  }
};
