import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../store/app-store.reducer';
import { selectAuthUserId } from '../store/auth.reducer';
import { ToeggeliActions, ToeggeliActionTypes, UserLoaded, UserRequested } from './toeggeli.actions';

@Injectable()
export class ToeggeliEffects implements OnInitEffects {
  @Effect()
  userRequested$ = this.actions$.pipe(
    ofType<UserRequested>(ToeggeliActionTypes.UserRequested),
    withLatestFrom(this.store.select(selectAuthUserId)),
    switchMap(([action, uid]) => this.angularFirestore.doc(`Users/${uid}`).valueChanges()),
    map(user => new UserLoaded({ user }))
  );

  constructor(
    private actions$: Actions<ToeggeliActions>,
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore
  ) {}

  ngrxOnInitEffects(): Action {
    console.log('onInit');
    return new UserRequested();
  }
}
