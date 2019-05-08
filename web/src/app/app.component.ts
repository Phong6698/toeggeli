import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app-store.reducer';
import { UserLogoutRequested } from './store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<AppState>) {
  }

  logout() {
    this.store.dispatch(new UserLogoutRequested());
  }
}
