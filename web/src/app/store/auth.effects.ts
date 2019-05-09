import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { UserRequested } from '../toeggeli/toeggeli.actions';
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
      return this.authService.doPasswordLogin(action.payload.email, action.payload.password).pipe(
        tap(() => this.router.navigate(['/toeggeli'])),
        catchError(error => of({ errorCode: error.code }))
      );
    }),
    map((data: any) => {
      if (data.errorCode) {
        return new UserLoginFailed(data);
      }
    }),
    filter(action => !!action)
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<UserLogoutRequested>(AuthActionTypes.UserLogoutRequested),
    tap(() => {
      this.authService.logout();
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  registration$ = this.actions$.pipe(
    ofType<UserRegistrationRequested>(AuthActionTypes.UserRegistrationRequested),
    switchMap(action => {
      return this.authService.createUserWithEmailAndPassword(action.payload.email, action.payload.password).pipe(
        tap(() => this.router.navigate(['/toeggeli'])),
        catchError(error => of({ errorCode: error.code }))
      );
    }),
    map((data: any) => {
      if (data.errorCode) {
        return new UserRegistrationFailed(data);
      }
    }),
    filter(action => !!action)
  );

  @Effect()
  userLoggedIn$ = this.actions$.pipe(
    ofType<UserLoggedIn>(AuthActionTypes.UserLoggedIn),
    map(() => new UserRequested())
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
