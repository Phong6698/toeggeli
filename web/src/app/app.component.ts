import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from './store/app-store.reducer';
import {selectIsAuthenticated} from './store/auth.reducer';
import {userLogoutRequested} from './store/auth.actions';

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
    this.store.dispatch(userLogoutRequested());
    this.sidenav.toggle();
  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
