import { Action } from '@ngrx/store';
import { Space } from './space';
import { User } from './user';

export enum ToeggeliActionTypes {
  UserRequested = '[Toeggeli] User Requested',
  UserLoaded = '[Toeggeli] User Loaded',
  SpacesRequested = '[Toeggeli] Spaces Requested',
  SpacesLoaded = '[Toeggeli] Spaces Loaded',
  AddSpaceRequested = '[Toeggeli] Add Space Requestet',
  AddSpaceCreated = '[Toeggeli] Add Space Created',
  AddSpaceFailed = '[Toeggeli] Add Space Failed',
  SpaceUsersRequested = '[Toeggeli] Space Users Requested',
  SpaceUsersAdded = '[Toeggeli] Space Users added',
  SpaceUsersModified = '[Toeggeli] Space Users modified',
  SpaceUsersRemoved = '[Toeggeli] Space Users removed'
}

export class UserRequested implements Action {
  readonly type = ToeggeliActionTypes.UserRequested;
}

export class UserLoaded implements Action {
  readonly type = ToeggeliActionTypes.UserLoaded;

  constructor(public payload: { user: User }) {}
}

export class SpacesRequested implements Action {
  readonly type = ToeggeliActionTypes.SpacesRequested;

  constructor(public payload: { spaces: string[] }) {}
}

export class SpacesLoaded implements Action {
  readonly type = ToeggeliActionTypes.SpacesLoaded;

  constructor(public payload: { spaces: Space[] }) {}
}

export class SpaceUsersRequested implements Action {
  readonly type = ToeggeliActionTypes.SpaceUsersRequested;

  constructor(public payload: { spaceId: string }) {}
}

export class SpaceUsersAdded implements Action {
  readonly type = ToeggeliActionTypes.SpaceUsersAdded;

  constructor(public payload: User) {}
}

export class SpaceUsersModified implements Action {
  readonly type = ToeggeliActionTypes.SpaceUsersModified;

  constructor(public payload: User) {}
}

export class SpaceUsersRemoved implements Action {
  readonly type = ToeggeliActionTypes.SpaceUsersRemoved;

  constructor(public payload: User) {}
}

export class AddSpaceRequested implements Action {
  readonly type = ToeggeliActionTypes.AddSpaceRequested;

  constructor(public payload: { spaceName: string }) {}
}

export class AddSpaceCreated implements Action {
  readonly type = ToeggeliActionTypes.AddSpaceCreated;
}

export class AddSpaceFailed implements Action {
  readonly type = ToeggeliActionTypes.AddSpaceFailed;
}

export type ToeggeliActions =
  | UserRequested
  | UserLoaded
  | SpacesRequested
  | SpacesLoaded
  | AddSpaceRequested
  | AddSpaceCreated
  | AddSpaceFailed
  | SpaceUsersRequested
  | SpaceUsersAdded
  | SpaceUsersModified
  | SpaceUsersRemoved;
