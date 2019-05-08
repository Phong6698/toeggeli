import { Action } from '@ngrx/store';
import { UserInfo } from 'firebase';

export enum AuthActionTypes {
  UserLoginRequested = '[Auth] User Login Requested',
  UserLogoutRequested = '[Auth] User Logout Requested',
  UserLoggedIn = '[Auth] User LoggedIn',
  UserLoggedOut = '[Auth] User LoggedOut'
}

export class UserLoginRequested implements Action {
  readonly type = AuthActionTypes.UserLoginRequested;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class UserLogoutRequested implements Action {
  readonly type = AuthActionTypes.UserLogoutRequested;
}

export class UserLoggedIn implements Action {
  readonly type = AuthActionTypes.UserLoggedIn;

  constructor(public payload: { user: UserInfo }) {
  }
}

export class UserLoggedOut implements Action {
  readonly type = AuthActionTypes.UserLoggedOut;
}

export type AuthActions = UserLoginRequested | UserLogoutRequested | UserLoggedIn | UserLoggedOut;
