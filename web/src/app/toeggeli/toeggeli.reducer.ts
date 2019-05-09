import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterParamSpaceId } from '../store/app-store.reducer';
import { ToeggeliActions, ToeggeliActionTypes } from './toeggeli.actions';

export interface ToeggeliState {
  user: any;
  spaces: any;
  hasAddSpaceError: boolean;
}

export const initialState: ToeggeliState = {
  user: null,
  spaces: null,
  hasAddSpaceError: false
};

export function toeggeliReducer(
  state = initialState,
  action: ToeggeliActions
): ToeggeliState {
  switch (action.type) {
    case ToeggeliActionTypes.UserLoaded:
      return {
        ...state,
        user: action.payload.user
      };

    case ToeggeliActionTypes.SpacesLoaded:
      return {
        ...state,
        spaces: action.payload.spaces
      };

    case ToeggeliActionTypes.AddSpaceFailed:
      return {
        ...state,
        hasAddSpaceError: true
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

export const selectToeggeliSpaces = createSelector(
  selectToeggeli,
  state => state.spaces
);

export const selectToeggeliSelectedSpaceName = createSelector(
  selectToeggeliSpaces,
  selectRouterParamSpaceId,
  (spaces, id) => {
    if (!spaces) {
      return null;
    }

    const selectedSpace = spaces.find(space => space.spaceId === id);

    return selectedSpace && selectedSpace.name;
  }
);

export const selectToeggeliAddSpaceError = createSelector(
  selectToeggeli,
  state => state.hasAddSpaceError
);
