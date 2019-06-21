import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {AppState} from './store/app-store.reducer';
import {selectAuthUser, selectIsAuthenticated} from './store/auth.reducer';
import {userLogoutRequested} from './store/auth.actions';
import {User} from './toeggeli/user';
import {selectToeggeliUser} from './toeggeli/toeggeli.reducer';
import {UserInfo} from 'firebase';
import * as GravatarModule from 'gravatar';
import {BreakpointObserver} from '@angular/cdk/layout';
import {takeUntil} from 'rxjs/operators';
import {SwUpdate} from '@angular/service-worker';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  @ViewChild('sidenav', {static: true})
  sidenav: MatSidenav;

  version = environment.version;
  isAuthenticated$: Observable<boolean>;
  user$: Observable<User>;
  userAuth$: Observable<UserInfo>;
  gravatarModule = GravatarModule;

  sideNavMode: 'over' | 'push' | 'side' = 'push';
  sideNavWidthClass: 'width-auto' | 'width-fixed' = 'width-auto';

  constructor(private store: Store<AppState>, private breakpointObserver: BreakpointObserver,
              private swUpdate: SwUpdate) {
  }

  logout() {
    this.store.dispatch(userLogoutRequested());
    this.sidenav.toggle();
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.pipe(takeUntil(this.destroy$)).subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }

    this.breakpointObserver.observe(['(max-width: 575.98px)', '(min-width: 992px)']).pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result.breakpoints['(min-width: 992px)']) {
          this.sideNavMode = 'side';
          this.sideNavWidthClass = 'width-fixed';
        } else if (result.breakpoints['(max-width: 575.98px)']) {
          this.sideNavMode = 'push';
          this.sideNavWidthClass = 'width-auto';
        } else {
          this.sideNavMode = 'push';
          this.sideNavWidthClass = 'width-fixed';
        }
      });
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.user$ = this.store.select(selectToeggeliUser);
    this.userAuth$ = this.store.select(selectAuthUser);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
