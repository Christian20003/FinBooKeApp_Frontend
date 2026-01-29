/**
 * This function implements a simple wait mechanism.
 *
 * @param time How long should be waited (in milliseconds).
 * @param useDefault If the `time` value is negative or zero,
 * use the default time of `10` seconds.
 */
export async function wait(
  time: number,
  useDefault: boolean = false
): Promise<void> {
  if (time <= 0 && useDefault) time = 10000;
  return new Promise(resolve => setTimeout(resolve, time));
}
