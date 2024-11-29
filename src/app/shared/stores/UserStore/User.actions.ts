import { createAction, props } from '@ngrx/store';
import { User } from '../../models/User';
import { Session } from '../../models/Session';

/**
 * This action can be used to set the user-object of the corresponding store.
 *
 * @param user - The {@link User} object which should be saved.
 */
export const setUser = createAction('[User] Set', props<{ user: User }>());

/**
 * This action can be used to delete the user-object in the store.
 */
export const deleteUser = createAction('[User] Delete');

/**
 * This action can be used to change the name of the {@link User} object.
 *
 * @param name - The new name of the user.
 */
export const setUserName = createAction(
  '[User] Set name',
  props<{ name: string }>()
);

/**
 * This action can be used to change the email address of the {@link User} object.
 *
 * @param email - The new email of the user.
 */
export const setEmail = createAction(
  '[User] Set email',
  props<{ email: string }>()
);

/**
 * This action can be used to change the image path (profile image) of the {@link User} object.
 *
 * @param imagePath - The new image path.
 */
export const setUserImagePath = createAction(
  '[User] Set imagePath',
  props<{ imagePath: string }>()
);

/**
 * This action can be used to change the {@link Session} object of the {@link User} object.
 *
 * @param session - The new session object.
 */
export const setUserSession = createAction(
  '[User] Set session',
  props<{ session: Session }>()
);

/**
 * This action can be used to load the {@link Session} object from local storage.
 */
export const loadUserSession = createAction('[User] Load session');
