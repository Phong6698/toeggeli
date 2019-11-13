import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {selectRouterParamSpaceId} from '../store/app-store.reducer';
import {Space} from './space';
import {
  addSpaceCreated,
  matchHistoryAdded,
  spacesLoaded,
  spaceUsersAdded,
  spaceUsersModified,
  spaceUsersRemoved,
  statisticAdded,
  userLoaded
} from './toeggeli.actions';
import {User} from './user';
import {Action} from '@ngrx/store/src/models';
import {Match, Statistic} from '../core/match.service';

export interface ToeggeliState {
  user: User;
  spaces: Space[];
  spaceUsers: EntityState<User>;
  hasAddSpaceError: boolean;
  matchHistory: EntityState<Match>;
  statistics: EntityState<Statistic>;
}

export const spaceUserAdapter = createEntityAdapter<User>();
export const matchHistoryAdapter = createEntityAdapter<Match>({
  sortComparer: sortByTimestamp
});
export const statisticsAdaptar = createEntityAdapter<Statistic>();

export function sortByTimestamp(a: Match, b: Match): number {
  return b.timestamp.seconds.toString().localeCompare(a.timestamp.seconds.toString());
}

export const initialState: ToeggeliState = {
  user: null,
  spaces: null,
  hasAddSpaceError: false,
  spaceUsers: spaceUserAdapter.getInitialState(),
  matchHistory: matchHistoryAdapter.getInitialState(),
  statistics: statisticsAdaptar.getInitialState()
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
    (state) => ({
      ...state,
      spaceUsers: spaceUserAdapter.removeAll(state.spaceUsers)
    })
  ),
  on(matchHistoryAdded,
    (state, {match}) => ({
      ...state,
      matchHistory: matchHistoryAdapter.addOne(match, state.matchHistory)
    })
  ),
  on(statisticAdded,
    (state, {statistic}) => ({
      ...state,
      statistics: statisticsAdaptar.addOne(statistic, state.statistics)
    })
  ),
);

export function reducer(state: ToeggeliState | undefined, action: Action) {
  return toeggeliReducer(state, action);
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

export const selectToeggeliMatchHistory = createSelector(
  selectToeggeli,
  state => state.matchHistory
);

export const selectToeggeliStatistics = createSelector(
  selectToeggeli,
  state => state.statistics
);

export const {
  selectAll: selectMatchHistory,
} = matchHistoryAdapter.getSelectors(selectToeggeliMatchHistory);

export const {
  selectAll: selectSpaceUsers,
} = spaceUserAdapter.getSelectors(selectToeggeliSpaceUsers);

export const {
  selectAll: selectStatistics,
} = statisticsAdaptar.getSelectors(selectToeggeliStatistics);






