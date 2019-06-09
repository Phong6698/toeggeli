import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {UserInfo} from 'firebase';
import {AppState} from './app-store.reducer';
import {userLoggedIn, userLoggedOut, userLoginFailed, userRegistrationFailed} from './auth.actions';

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

export const authReducer = createReducer(
  initialState,
  on(userLoggedIn,
    (state, {user}) => ({
      ...state,
      user
    })
  ),
  on(userLoggedOut,
    (state) => ({
      ...state,
      user: null
    })
  ),
  on(userLoginFailed,
    (state, {errorCode}) => ({
      ...state,
      loginErrorCode: errorCode
    })
  ),
  on(userRegistrationFailed,
    (state, {errorCode}) => ({
      ...state,
      registrationErrorCode: errorCode
    })
  )
);

const selectAuth = (state: AppState) => state.auth;

export const selectIsAuthenticated = createSelector(
  selectAuth,
  auth => (!!auth.user)
);

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

export const selectUserRegistrationError = createSelector(
  selectAuth,
  state => state.registrationErrorCode
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
