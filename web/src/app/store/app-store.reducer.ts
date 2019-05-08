import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { authReducer, AuthState } from './auth.reducer';
import { RouterStateUrl } from './router-state-url';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
