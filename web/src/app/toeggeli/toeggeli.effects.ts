import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState, selectRouterParamSpaceId } from '../store/app-store.reducer';
import { selectAuthUserId } from '../store/auth.reducer';
import { ToeggeliActions, ToeggeliActionTypes, UserLoaded, UserRequested } from './toeggeli.actions';
import { selectToeggeliUserSpaces } from './toeggeli.reducer';

@Injectable()
export class ToeggeliEffects implements OnInitEffects {
  @Effect()
  userRequested$ = this.actions$.pipe(
    ofType<UserRequested>(ToeggeliActionTypes.UserRequested),
    withLatestFrom(this.store.select(selectAuthUserId)),
    switchMap(([action, uid]) => this.angularFirestore.doc(`Users/${uid}`).valueChanges()),
    map(user => new UserLoaded({ user }))
  );

  @Effect({ dispatch: false })
  userLoaded$ = this.actions$.pipe(
    ofType<UserLoaded>(ToeggeliActionTypes.UserLoaded),
    withLatestFrom(this.store.select(selectRouterParamSpaceId), this.store.select(selectToeggeliUserSpaces)),
    tap(([action, spaceId, userSpaces]) => {
      if (!spaceId && userSpaces && userSpaces[0]) {
        this.router.navigateByUrl(`/toeggeli/${userSpaces[0]}`);
      }
    })
  );

  constructor(
    private actions$: Actions<ToeggeliActions>,
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {}

  ngrxOnInitEffects(): Action {
    return new UserRequested();
  }
}
