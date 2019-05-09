import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import {
  AuthActionTypes,
  UserLoggedIn,
  UserLoggedOut,
  UserLoginFailed,
  UserLoginRequested,
  UserLogoutRequested,
  UserRegistrationFailed,
  UserRegistrationRequested
} from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  init$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    switchMap(() => this.authService.getAuthState()),
    map(user => {
      if (user) {
        const profile = {
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          providerId: user.providerId,
          uid: user.uid
        };
        return new UserLoggedIn({ user: profile });
      } else {
        // this.router.navigate(['/auth']);
        return new UserLoggedOut();
      }
    })
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType<UserLoginRequested>(AuthActionTypes.UserLoginRequested),
    switchMap(action => {
      return this.authService
        .doPasswordLogin(action.payload.email, action.payload.password)
        .pipe(
          tap(() => this.router.navigate(['/toeggeli'])),
          catchError(error =>
            of(new UserLoginFailed({ errorCode: error.code }))
          )
        );
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<UserLogoutRequested>(AuthActionTypes.UserLogoutRequested),
    tap(() => {
      this.authService.logout();
    })
  );

  @Effect()
  registration$ = this.actions$.pipe(
    ofType<UserRegistrationRequested>(
      AuthActionTypes.UserRegistrationRequested
    ),
    switchMap(action => {
      return this.authService
        .createUserWithEmailAndPassword(
          action.payload.email,
          action.payload.password
        )
        .pipe(
          tap(() => this.router.navigate(['/toeggeli'])),
          catchError(error =>
            of(new UserRegistrationFailed({ errorCode: error.code }))
          )
        );
    })

    /*tap(action => {
      this.authService
        .createUserWithEmailAndPassword(
          action.payload.email,
          action.payload.password
        )
        .then(() => {
          //this.router.navigate(['/toeggeli']);
        });
    })*/
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
