import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectRouterParamSpaceId} from '../../store/app-store.reducer';
import {spaceUsersRemoved, spaceUsersRequested} from '../toeggeli.actions';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectRouterParamSpaceId).subscribe(spaceId => {
      if (spaceId) {
        this.store.dispatch(spaceUsersRemoved);
        this.store.dispatch(spaceUsersRequested({ spaceId }));
      }
    });
  }
}
