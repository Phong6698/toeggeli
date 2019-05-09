import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState, selectRouterParamSpaceId } from '../store/app-store.reducer';
import { selectAuthUserId } from '../store/auth.reducer';
import {
  SpacesLoaded,
  SpacesRequested,
  ToeggeliActions,
  ToeggeliActionTypes,
  UserLoaded,
  UserRequested
} from './toeggeli.actions';
import { selectToeggeliUserSpaces } from './toeggeli.reducer';

@Injectable()
export class ToeggeliEffects {
  @Effect()
  userRequested$ = this.actions$.pipe(
    ofType<UserRequested>(ToeggeliActionTypes.UserRequested),
    withLatestFrom(this.store.select(selectAuthUserId)),
    switchMap(([action, uid]) =>
      this.angularFirestore.doc(`Users/${uid}`).valueChanges()
    ),
    map(user => new UserLoaded({ user }))
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

  constructor(
    private actions$: Actions<ToeggeliActions>,
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {}
}
