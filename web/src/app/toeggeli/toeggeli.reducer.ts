import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterParamSpaceId } from '../store/app-store.reducer';
import { Space } from './space';
import { ToeggeliActions, ToeggeliActionTypes } from './toeggeli.actions';
import { User } from './user';

export interface ToeggeliState {
  user: User;
  spaces: Space[];
  spaceUsers: EntityState<User>;
  hasAddSpaceError: boolean;
}

export const spaceUserAdapter = createEntityAdapter<User>();

export const initialState: ToeggeliState = {
  user: null,
  spaces: null,
  hasAddSpaceError: false,
  spaceUsers: spaceUserAdapter.getInitialState()
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

    case ToeggeliActionTypes.SpaceUsersAdded:
      return {
        ...state,
        spaceUsers: spaceUserAdapter.addOne(action.payload, state.spaceUsers)
      };

    case ToeggeliActionTypes.SpaceUsersModified:
      return {
        ...state,
        spaceUsers: spaceUserAdapter.updateOne(
          { id: (action.payload as any).id, changes: action.payload },
          state.spaceUsers
        )
      };

    case ToeggeliActionTypes.SpaceUsersRemoved:
      return {
        ...state,
        spaceUsers: spaceUserAdapter.removeOne(
          (action.payload as any).id,
          state.spaceUsers
        )
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

export const selectToeggeliSelectedSpace = createSelector(
  selectToeggeliSpaces,
  selectRouterParamSpaceId,
  (spaces, id) => {
    if (!spaces) {
      return null;
    }

    return spaces.find(space => space.spaceId === id);
  }
);

export const selectToeggeliAddSpaceError = createSelector(
  selectToeggeli,
  state => state.hasAddSpaceError
);

export const selectToeggeliSelectedSpaceId = createSelector(
  selectToeggeliSelectedSpace,
  space => space && space.spaceId
);

export const selectToeggeliSelectedSpaceName = createSelector(
  selectToeggeliSelectedSpace,
  space => space && space.name
);

export const selectToeggeliSpaceUsers = createSelector(
  selectToeggeli,
  state => state.spaceUsers
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = spaceUserAdapter.getSelectors(selectToeggeliSpaceUsers);
