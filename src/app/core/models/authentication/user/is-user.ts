import { isISession } from './is-session';
import { IUser } from './user';

/**
 * This function validates if the provied object is of type
 * {@link IUser} at runtime.
 *
 * @param obj The object that should be checked.
 * @returns `true` if the object is of type {@link IUser},
 * otherwise `false`.
 */
export function isIUser(obj: unknown): obj is IUser {
  if (obj === null && typeof obj !== 'object') {
    return false;
  }

  const user = obj as IUser;

  return (
    typeof user.name === 'string' &&
    typeof user.email === 'string' &&
    typeof user.imagePath === 'string' &&
    isISession(user.session)
  );
}
