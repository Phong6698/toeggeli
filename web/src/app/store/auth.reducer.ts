import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { AppState } from './app-store.reducer';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  user: UserInfo;
  loginErrorCode: string;
}

export const initialState: AuthState = {
  user: null,
  loginErrorCode: null
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
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
    default:
      return state;
  }
}

const selectAuth = (state: AppState) => state.auth;

export const selectAuthUser = createSelector(
  selectAuth,
  auth => auth.user
);

export const selectAuthUserId = createSelector(
  selectAuthUser,
  user => user && user.uid
);

export const selectAuthLoginError = createSelector(
  selectAuth,
  state => state.loginErrorCode
);
