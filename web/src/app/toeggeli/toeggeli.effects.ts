import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { MatchService } from '../core/match.service';
import { SpaceService } from '../core/space.service';
import { AppState, selectRouterParamSpaceId } from '../store/app-store.reducer';
import { selectAuthUserId } from '../store/auth.reducer';
import {
  AddSpaceCreated,
  AddSpaceFailed,
  AddSpaceRequested,
  MatchCreationRequested,
  SpacesLoaded,
  SpacesRequested,
  SpaceUsersRequested,
  ToeggeliActions,
  ToeggeliActionTypes,
  UserLoaded,
  UserRequested
} from './toeggeli.actions';
import { selectToeggeliUserSpaces } from './toeggeli.reducer';
import { User } from './user';

@Injectable()
export class ToeggeliEffects {
  @Effect()
  userRequested$ = this.actions$.pipe(
    ofType<UserRequested>(ToeggeliActionTypes.UserRequested),
    withLatestFrom(this.store.select(selectAuthUserId)),
    switchMap(([action, uid]) =>
      this.angularFirestore.doc(`Users/${uid}`).valueChanges()
    ),
    map(user => new UserLoaded({ user: user as User }))
  );

  @Effect()
  userLoaded$ = this.actions$.pipe(
    ofType<UserLoaded>(ToeggeliActionTypes.UserLoaded),
    withLatestFrom(
      this.store.select(selectRouterParamSpaceId),
      this.store.select(selectToeggeliUserSpaces)
    ),
    tap(([action, spaceId, userSpaces]) => {
      if (!spaceId && userSpaces && userSpaces[0]) {
        this.router.navigateByUrl(`/${userSpaces[0]}`);
      }
    }),
    map(
      ([action, spaceId, userSpaces]) =>
        new SpacesRequested({ spaces: userSpaces })
    )
  );

  @Effect()
  spacesRequested$ = this.actions$.pipe(
    ofType<SpacesRequested>(ToeggeliActionTypes.SpacesRequested),
    switchMap(action => {
      const spaces = action.payload.spaces;
      const spaceCollections: Observable<any>[] = spaces.map(spaceId =>
        this.angularFirestore
          .doc('Spaces/' + spaceId)
          .valueChanges()
          .pipe(
            map(space => {
              return {
                ...space,
                spaceId
              };
            })
          )
      );

      return combineLatest(spaceCollections).pipe(
        map(spacesCol =>
          spacesCol.reduce(
            (previousValue, currentValue) => [...previousValue, currentValue],
            []
          )
        )
      );
    }),
    map(spaces => {
      return new SpacesLoaded({ spaces });
    })
  );

  @Effect()
  spaceUsersRequested$ = this.actions$.pipe(
    ofType<SpaceUsersRequested>(ToeggeliActionTypes.SpaceUsersRequested),
    switchMap(action => {
      return this.angularFirestore
        .collection('Users', ref => {
          return ref.where('spaces', 'array-contains', action.payload.spaceId);
        })
        .stateChanges();
    }),
    mergeMap(actions => actions),
    map(action => {
      return {
        type: `[Toeggeli] Space Users ${action.type}`,
        payload: {
          ...action.payload.doc.data(),
          id: action.payload.doc.id
        }
      };
    })
  );

  @Effect()
  addSpaceRequested$ = this.actions$.pipe(
    ofType<AddSpaceRequested>(ToeggeliActionTypes.AddSpaceRequested),
    withLatestFrom(this.store.select(selectAuthUserId)),
    switchMap(([action, userId]) => {
      return this.spaceService.addSpace(action.payload.spaceName, userId).pipe(
        map(() => {
          return true;
        }),
        catchError(error => {
          return of(false);
        })
      );
    }),
    map((res: any) => {
      if (res) {
        return new AddSpaceCreated();
      } else {
        return new AddSpaceFailed();
      }
    })
  );

  @Effect({ dispatch: false })
  matchCreationRequested$ = this.actions$.pipe(
    ofType<MatchCreationRequested>(ToeggeliActionTypes.MatchCreationRequested),
    switchMap(action => {
      return this.matchService.createMatch(action.payload.match).pipe(tap());
    })
  );

  constructor(
    private actions$: Actions<ToeggeliActions>,
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private spaceService: SpaceService,
    private matchService: MatchService
  ) {}
}
