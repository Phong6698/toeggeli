import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {selectRouterParamSpaceId} from '../store/app-store.reducer';
import {Space} from './space';
import {
  addSpaceCreated,
  spacesLoaded,
  spaceUsersAdded,
  spaceUsersModified,
  spaceUsersRemoved,
  userLoaded
} from './toeggeli.actions';
import {User} from './user';

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

export const toeggeliReducer = createReducer(
  initialState,
  on(userLoaded,
    (state, {user}) => ({
      ...state,
      user
    })
  ),
  on(spacesLoaded,
    (state, {spaces}) => ({
      ...state,
      spaces
    })
  ),
  on(addSpaceCreated,
    (state) => ({
      ...state,
      hasAddSpaceError: false
    })
  ),
  on(spaceUsersAdded,
    (state, {user}) => ({
      ...state,
      spaceUsers: spaceUserAdapter.addOne(user, state.spaceUsers)
    })
  ),
  on(spaceUsersModified,
    (state, {user}) => ({
      ...state,
      spaceUsers: spaceUserAdapter.updateOne(
        {id: (user as any).id, changes: user},
        state.spaceUsers
      )
    })
  ),
  on(spaceUsersRemoved,
    (state, {user}) => ({
      ...state,
      spaceUsers: spaceUserAdapter.removeOne(
        (user as any).id,
        state.spaceUsers
      )
    })
  )
);

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
