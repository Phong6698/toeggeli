import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, filter, map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../core/auth.service';
import {UserService} from '../core/user.service';
import {
  userCreationRequested,
  userLoggedIn,
  userLoggedOut,
  userLoginFailed,
  userLoginRequested,
  userLogoutRequested,
  userRegistrationFailed,
  userRegistrationRequested
} from './auth.actions';
import {userRequested} from '../toeggeli/toeggeli.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthService,
              private userService: UserService, private router: Router) {
  }

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
        return userLoggedIn({user: profile});
      } else {
        // this.router.navigate(['/auth']);
        return userLoggedOut();
      }
    })
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType(userLoginRequested),
    switchMap(action => {
      return this.authService
        .doPasswordLogin(action.email, action.password)
        .pipe(
          tap(() => this.router.navigate(['/'])),
          catchError(error => of({errorCode: error.code}))
        );
    }),
    map((data: any) => {
      if (data.errorCode) {
        return userLoginFailed(data);
      }
    }),
    filter(action => !!action)
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType(userLogoutRequested),
    tap(() => {
      this.authService.logout();
      console.log('lol???');
      this.router.navigate(['/auth']);
    })
  );

  registration$ = createEffect(() => this.actions$.pipe(
    ofType(userRegistrationRequested),
    switchMap(action => {
      return this.authService.createUserWithEmailAndPassword(action.email, action.password).pipe(
        map(user => {
          return {
            uid: user.user.uid,
            username: action.username,
            firstName: action.firstName,
            lastName: action.lastName
          };
        }),
        catchError(error => of({errorCode: error.code}))
      );
    }),
    map((data: any) => {
      if (data.errorCode) {
        return userRegistrationFailed(data);
      } else {
        return userCreationRequested({
          uid: data.uid,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName
        });
      }
    })
  ));

  @Effect({dispatch: false})
  createUser$ = this.actions$.pipe(
    ofType(userCreationRequested),
    switchMap(action => {
      return this.userService.createUser(
        action.uid,
        action.username,
        action.firstName,
        action.lastName).pipe(
        tap(() => this.router.navigate(['/']))
      );
    })
  );

  @Effect()
  userLoggedIn$ = this.actions$.pipe(
    ofType(userLoggedIn),
    map(() => userRequested())
  );

}
