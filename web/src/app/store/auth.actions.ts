import {createAction, props} from '@ngrx/store';
import {UserInfo} from 'firebase';

export const userLoginRequested = createAction(
  '[Auth] User Login Requested',
  props<{ email: string; password: string }>()
);

/*
export const userLoginSuccessful = createAction(
  '[Auth] User Login Successful'
);
*/

export const userLoginFailed = createAction(
  '[Auth] User Login Failed',
  props<{ errorCode: string }>()
);

export const userLogoutRequested = createAction(
  '[Auth] User Logout Requested'
);

export const userLoggedIn = createAction(
  '[Auth] User LoggedIn',
  props<{ user: UserInfo }>()
);

export const userLoggedOut = createAction(
  '[Auth] User LoggedOut'
);

export const userRegistrationRequested = createAction(
  '[Auth] User Registration Requested',
  props<{ username: string; firstName: string; lastName: string; email: string; password: string }>()
);

export const userRegistrationFailed = createAction(
  '[Auth] User Registration Failed',
  props<{ errorCode: string }>()
);

export const userCreationRequested = createAction(
  '[Auth] User Creation Requested',
  props<{ uid: string; username: string; firstName: string; lastName: string }>()
);
