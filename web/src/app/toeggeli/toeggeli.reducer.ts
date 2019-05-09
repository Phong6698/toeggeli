import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ToeggeliActions, ToeggeliActionTypes } from './toeggeli.actions';

export interface ToeggeliState {
  user: any;
}

export const initialState: ToeggeliState = {
  user: null
};

export function toeggeliReducer(state = initialState, action: ToeggeliActions): ToeggeliState {
  switch (action.type) {
    case ToeggeliActionTypes.UserLoaded:
      return {
        ...state,
        user: action.payload.user
      };

    default:
      return state;
  }
}

export const selectToeggeli = createFeatureSelector<ToeggeliState>('toeggeli');

export const selectToeggeliUser = createSelector(
  selectToeggeli,
  state => state.user
);

export const selectToeggeliUserSpaces = createSelector(
  selectToeggeliUser,
  user => user && user.spaces
);