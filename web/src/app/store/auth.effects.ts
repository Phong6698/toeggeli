import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {AuthService} from '../core/auth.service';
import {UserService} from '../core/user.service';
import {UserRequested} from '../toeggeli/toeggeli.actions';
import {
  AuthActionTypes,
  UserLoggedIn,
  UserLoggedOut,
  UserLoginFailed,
  UserLoginRequested,
  UserLogoutRequested,
  UserRegistrationFailed,
  UserRegistrationRequested,
  UserCreationRequested
} from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthService, private userService: UserService, private router: Router) {
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
        return new UserLoggedIn({user: profile});
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
          tap(() => this.router.navigate(['/'])),
          catchError(error => of({errorCode: error.code}))
        );
    }),
    map((data: any) => {
      if (data.errorCode) {
        return new UserLoginFailed(data);
      }
    }),
    filter(action => !!action)
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<UserLogoutRequested>(AuthActionTypes.UserLogoutRequested),
    tap(() => {
      this.authService.logout();
      console.log('lol???');
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  registration$ = this.actions$.pipe(
    ofType<UserRegistrationRequested>(
      AuthActionTypes.UserRegistrationRequested
    ),
    switchMap(action => {
      return this.authService.createUserWithEmailAndPassword(action.payload.email, action.payload.password).pipe(
        map(user => {
          return {
            uid: user.user.uid,
            username: action.payload.username,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName
          };
        }),
        catchError(error => of({errorCode: error.code}))
      );
    }),
    map((data: any) => {
      if (data.errorCode) {
        return new UserRegistrationFailed(data);
      } else {
        return new UserCreationRequested({
          uid: data.uid,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName
        });
      }
    })
  );

  @Effect()
  createUser$ = this.actions$.pipe(
    ofType<UserCreationRequested>(AuthActionTypes.UserCreationRequested),
    switchMap(action => {
      return this.userService.createUser(
        action.payload.uid,
        action.payload.username,
        action.payload.firstName,
        action.payload.lastName).pipe(
        tap(() => this.router.navigate(['/']))
      );
    })
  );

  @Effect()
  userLoggedIn$ = this.actions$.pipe(
    ofType<UserLoggedIn>(AuthActionTypes.UserLoggedIn),
    map(() => new UserRequested())
  );

}
