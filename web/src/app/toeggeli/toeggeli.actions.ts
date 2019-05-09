import { Action } from '@ngrx/store';

export enum ToeggeliActionTypes {
  UserRequested = '[Toeggeli] User Requested',
  UserLoaded = '[Toeggeli] User Loaded',
  SpaceRequested = '[Toeggeli] Space Requested'
}

export class UserRequested implements Action {
  readonly type = ToeggeliActionTypes.UserRequested;
}

export class UserLoaded implements Action {
  readonly type = ToeggeliActionTypes.UserLoaded;

  constructor(public payload: { user: any }) {}
}

export class SpaceRequested implements Action {
  readonly type = ToeggeliActionTypes.SpaceRequested;
}

export type ToeggeliActions = UserRequested | UserLoaded | SpaceRequested;
