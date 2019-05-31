import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from './store/app-store.reducer';
import {UserLogoutRequested} from './store/auth.actions';
import {selectIsAuthenticated} from './store/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  @ViewChild('sidenav', { static: true })
  sidenav: MatSidenav;

  constructor(private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(new UserLogoutRequested());
    this.sidenav.toggle();
  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
