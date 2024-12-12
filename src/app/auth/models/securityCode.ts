/**
 * This interface represents the structure of data which will be emitted by the SetCodeComponent.
 * It consists of all code values.
 *
 * @property {string} value1  - The first code value
 * @property {string} value2  - The second code value
 * @property {string} value3  - The third code value
 * @property {string} value4  - The forth code value
 * @property {string} value5  - The fifth code value
 * @property {string} value6  - The sixth code value
 */
export interface SecurityCode {
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
  value6: string;
}

export const TestSecurityCode: SecurityCode = {
  value1: 'A',
  value2: '2',
  value3: 'F',
  value4: '9',
  value5: 'V',
  value6: 'E',
};
