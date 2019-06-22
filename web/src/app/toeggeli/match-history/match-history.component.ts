import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app-store.reducer';
import {Observable, Subject} from 'rxjs';
import {Match} from '../../core/match.service';
import {selectMatchHistory, selectToeggeliSelectedSpaceId} from '../toeggeli.reducer';
import {matchHistoryRequested} from '../toeggeli.actions';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.scss']
})
export class MatchHistoryComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  matches$: Observable<Match[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(selectToeggeliSelectedSpaceId).pipe(takeUntil(this.destroy$)).subscribe(spaceID => {
      if (spaceID) {
        this.store.dispatch(matchHistoryRequested({spaceID}));
      }
    });
    this.matches$ = this.store.select(selectMatchHistory);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
