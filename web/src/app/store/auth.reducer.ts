import { UserInfo } from 'firebase';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  user: UserInfo;
}

export const initialState: AuthState = {
  user: null
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
    default:
      return state;
  }
}
