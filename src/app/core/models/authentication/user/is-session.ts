import { ISession } from './session';

/**
 * This function validates if the provided object is of
 * type {@link ISession}.
 *
 * @param obj The object that should be validated.
 * @returns `true` if the object is of type {@link ISession},
 * otherwise `false`.
 */
export function isISession(obj: unknown): obj is ISession {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }

  const session = obj as ISession;

  return (
    typeof session.jwtToken === 'string' &&
    typeof session.jwtExpire === 'number' &&
    typeof session.refreshToken === 'string' &&
    typeof session.refreshExpire === 'number'
  );
}
