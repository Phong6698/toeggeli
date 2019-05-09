import { Action } from '@ngrx/store';
import { UserInfo } from 'firebase';

export enum AuthActionTypes {
  UserLoginRequested = '[Auth] User Login Requested',
  // UserLoginSuccessful = '[Auth] User Login Successful',
  UserLoginFailed = '[Auth] User Login Failed',
  UserLogoutRequested = '[Auth] User Logout Requested',
  UserLoggedIn = '[Auth] User LoggedIn',
  UserLoggedOut = '[Auth] User LoggedOut',
  UserRegistrationRequested = '[Auth] User Registration Requested',
  UserRegistrationFailed = '[Auth] User Registration Failed',
  UserCreationRequested = '[Auth] User Creation Requested'
}

export class UserLoginRequested implements Action {
  readonly type = AuthActionTypes.UserLoginRequested;

  constructor(public payload: { email: string; password: string }) {}
}

// export class UserLoginSuccessful implements Action {
//   readonly type = AuthActionTypes.UserLoginSuccessful;
// }

export class UserLoginFailed implements Action {
  readonly type = AuthActionTypes.UserLoginFailed;

  constructor(public payload: { errorCode: string }) {}
}

export class UserLogoutRequested implements Action {
  readonly type = AuthActionTypes.UserLogoutRequested;
}

export class UserLoggedIn implements Action {
  readonly type = AuthActionTypes.UserLoggedIn;

  constructor(public payload: { user: UserInfo }) {}
}

export class UserLoggedOut implements Action {
  readonly type = AuthActionTypes.UserLoggedOut;
}

export class UserRegistrationRequested implements Action {
  readonly type = AuthActionTypes.UserRegistrationRequested;

  constructor(public payload: {username: string; firstName: string; lastName: string; email: string; password: string }) {}
}

export class UserRegistrationFailed implements Action {
  readonly type = AuthActionTypes.UserRegistrationFailed;

  constructor(public payload: { errorCode: string }) {}
}

export class UserCreationRequested implements Action {
  readonly type = AuthActionTypes.UserCreationRequested;
  constructor(public payload: {uid: string; username: string; firstName: string; lastName: string}) {}
}

export type AuthActions =
  | UserLoginRequested
  // | UserLoginSuccessful
  | UserLoginFailed
  | UserLogoutRequested
  | UserLoggedIn
  | UserLoggedOut
  | UserRegistrationRequested
  | UserRegistrationFailed
  | UserCreationRequested;
