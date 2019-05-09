import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  user: UserInfo;
  loginErrorCode: string;
  registrationErrorCode: string;
}

export const initialState: AuthState = {
  user: null,
  loginErrorCode: null,
  registrationErrorCode: null
};

export function authReducer(
  state = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.UserLoggedIn:
      return {
        ...state,
        user: action.payload.user
      };
    case AuthActionTypes.UserLoggedOut:
      return {
        ...state,
        user: null
      };
    case AuthActionTypes.UserLoginFailed:
      return {
        ...state,
        loginErrorCode: action.payload.errorCode
      };

    case AuthActionTypes.UserRegistrationFailed:
      return {
        ...state,
        registrationErrorCode: action.payload.errorCode
      };
    default:
      return state;
  }
}

const selectUser = createFeatureSelector<AuthState>('auth');

export const selectUserInfo = createSelector(
  selectUser,
  state => state.user
);

export const selectUserLoginError = createSelector(
  selectUser,
  state => state.loginErrorCode
);

export const selectUserRegistrationError = createSelector(
  selectUser,
  state => state.registrationErrorCode
);
