import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';

import {environment} from '../../environments/environment';
import {AuthState, reducer} from './auth.reducer';
import {RouterStateUrl} from './router-state-url';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectRouter = (state: AppState) => state.router;

export const selectRouterState = createSelector(
  selectRouter,
  router => router && router.state
);

export const selectRouterParams = createSelector(
  selectRouterState,
  state => state && state.params
);

export const selectRouterParamSpaceId = createSelector(
  selectRouterParams,
  params => params && params.spaceId
);
