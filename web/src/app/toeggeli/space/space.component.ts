import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectRouterParamSpaceId} from '../../store/app-store.reducer';
import {spaceUsersRemoved, spaceUsersRequested} from '../toeggeli.actions';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectRouterParamSpaceId).pipe(takeUntil(this.destroy$)).subscribe(spaceId => {
      if (spaceId) {
        this.store.dispatch(spaceUsersRemoved);
        this.store.dispatch(spaceUsersRequested({ spaceId }));
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
