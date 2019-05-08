import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { AuthActionTypes, UserLoggedIn, UserLoggedOut, UserLoginRequested, UserLogoutRequested } from './auth.actions';

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
          uid: user.uid,
        };
        this.router.navigate(['/toeggeli']);
        return new UserLoggedIn({ user: profile });
      } else {
        return new UserLoggedOut();
      }
    })
  );

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<UserLoginRequested>(AuthActionTypes.UserLoginRequested),
    tap(action => {
      this.authService.doPasswordLogin(action.payload.email, action.payload.password);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<UserLogoutRequested>(AuthActionTypes.UserLogoutRequested),
    tap(() => {
      this.authService.logout();
    })
  );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }

}
