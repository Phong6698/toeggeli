import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {combineLatest, Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Match, MatchService} from '../core/match.service';
import {SpaceService} from '../core/space.service';
import {AppState, selectRouterParamSpaceId} from '../store/app-store.reducer';
import {selectAuthUserId} from '../store/auth.reducer';
import {selectToeggeliUserSpaces} from './toeggeli.reducer';
import {User} from './user';
import {
  addSpaceCreated,
  addSpaceFailed,
  addSpaceRequested,
  matchCreationRequested,
  matchHistoryAdded,
  matchHistoryRequested,
  spacesLoaded,
  spacesRequested,
  spaceUsersAdded,
  spaceUsersRequested,
  userLoaded,
  userRequested
} from './toeggeli.actions';

@Injectable()
export class ToeggeliEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private spaceService: SpaceService,
    private matchService: MatchService
  ) {
  }

  @Effect()
  userRequested$ = this.actions$.pipe(
    ofType(userRequested),
    withLatestFrom(this.store.select(selectAuthUserId)),
    switchMap(([action, uid]) =>
      this.angularFirestore.doc(`Users/${uid}`).valueChanges()
    ),
    map(user => userLoaded({user: user as User}))
  );

  @Effect()
  userLoaded$ = this.actions$.pipe(
    ofType(userLoaded),
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
        spacesRequested({spaces: userSpaces})
    )
  );

  @Effect()
  spacesRequested$ = this.actions$.pipe(
    ofType(spacesRequested),
    switchMap(action => {
      const spaces = action.spaces;
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
      return spacesLoaded({spaces});
    })
  );

  @Effect()
  spaceUsersRequested$ = this.actions$.pipe(
    ofType(spaceUsersRequested),
    switchMap(action => {
      return this.angularFirestore
        .collection('Users', ref => {
          return ref.where('spaces', 'array-contains', action.spaceId);
        })
        .stateChanges();
    }),
    mergeMap(actions => actions),
    map(action => {
      return {...action.payload.doc.data(), id: action.payload.doc.id};
    }),
    map(user => {

      return spaceUsersAdded({user: user as User});

    })
  );

  @Effect()
  addSpaceRequested$ = this.actions$.pipe(
    ofType(addSpaceRequested),
    withLatestFrom(this.store.select(selectAuthUserId)),
    switchMap(([action, userId]) => {
      return this.spaceService.addSpace(action.spaceName, userId).pipe(
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
        return addSpaceCreated();
      } else {
        return addSpaceFailed();
      }
    })
  );

  @Effect({dispatch: false})
  matchCreationRequested$ = this.actions$.pipe(
    ofType(matchCreationRequested),
    switchMap(action => {
      return this.matchService.createMatch(action.match);
    })
  );

  matchHistoryRequested$ = createEffect(() => this.actions$.pipe(
    ofType(matchHistoryRequested),
    switchMap((action) => {
      return this.matchService.getMatchHistory(action.spaceID);
    }),
    mergeMap(action => action),
    map(action => {
      return {...action.payload.doc.data(), id: action.payload.doc.id};
    }),
    map(match => matchHistoryAdded({match: match as Match}))
  ));

}
