import { Action } from '@ngrx/store';

export enum ToeggeliActionTypes {
  UserRequested = '[Toeggeli] User Requested',
  UserLoaded = '[Toeggeli] User Loaded',
  SpacesRequested = '[Toeggeli] Spaces Requested',
  SpacesLoaded = '[Toeggeli] Spaces Loaded',
  AddSpaceRequested = '[Toeggeli] Add Space Requestet',
  AddSpaceFailed = '[Toeggeli] Add Space Failed'
}

export class UserRequested implements Action {
  readonly type = ToeggeliActionTypes.UserRequested;
}

export class UserLoaded implements Action {
  readonly type = ToeggeliActionTypes.UserLoaded;

  constructor(public payload: { user: any }) {}
}

export class SpacesRequested implements Action {
  readonly type = ToeggeliActionTypes.SpacesRequested;

  constructor(public payload: { spaces: string[] }) {}
}

export class SpacesLoaded implements Action {
  readonly type = ToeggeliActionTypes.SpacesLoaded;

  constructor(public payload: { spaces: string[] }) {}
}

export class AddSpaceRequested implements Action {
  readonly type = ToeggeliActionTypes.AddSpaceRequested;

  constructor(public payload: { spaceName: string }) {}
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
  | AddSpaceFailed;
