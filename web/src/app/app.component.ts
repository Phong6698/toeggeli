import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from './store/app-store.reducer';
import {selectAuthUser, selectIsAuthenticated} from './store/auth.reducer';
import {userLogoutRequested} from './store/auth.actions';
import {User} from './toeggeli/user';
import {selectToeggeliUser} from './toeggeli/toeggeli.reducer';
import {UserInfo} from 'firebase';
import * as GravatarModule from 'gravatar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav', {static: true})
  sidenav: MatSidenav;

  isAuthenticated$: Observable<boolean>;
  user$: Observable<User>;
  userAuth$: Observable<UserInfo>;
  gravatarModule = GravatarModule;

  constructor(private store: Store<AppState>) {
  }

  logout() {
    this.store.dispatch(userLogoutRequested());
    this.sidenav.toggle();
  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.user$ = this.store.select(selectToeggeliUser);
    this.userAuth$ = this.store.select(selectAuthUser);
    console.log();
  }
}
