import {createAction, props} from '@ngrx/store';
import {Match} from '../core/match.service';
import {Space} from './space';
import {User} from './user';

export const userRequested = createAction(
  '[Toeggeli] User Requested'
);

export const userLoaded = createAction(
  '[Toeggeli] User Loaded',
  props<{ user: User }>()
);

export const spacesRequested = createAction(
  '[Toeggeli] Spaces Requested',
  props<{ spaces: string[] }>()
);

export const spacesLoaded = createAction(
  '[Toeggeli] Spaces Loaded',
  props<{ spaces: Space[] }>()
);

export const spaceUsersRequested = createAction(
  '[Toeggeli] Space Users Requested',
  props<{ spaceId: string }>()
);

export const spaceUsersAdded = createAction(
  '[Toeggeli] Space Users added',
  props<{ user: User }>()
);

export const spaceUsersModified = createAction(
  '[Toeggeli] Space Users modified',
  props<{ user: User }>()
);

export const spaceUsersRemoved = createAction(
  '[Toeggeli] Space Users removed',
  props<{ user: User }>()
);

export const addSpaceRequested = createAction(
  '[Toeggeli] Add Space Requested',
  props<{ spaceName: string }>()
);

export const addSpaceCreated = createAction(
  '[Toeggeli] Add Space Created'
);

export const addSpaceFailed = createAction(
  '[Toeggeli] Add Space Failed'
);

export const matchCreationRequested = createAction(
  '[Toeggeli] Match Creation Requested',
  props<{ match: Match }>()
);

