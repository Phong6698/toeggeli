import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app-store.reducer';
import {selectSpaceUsers, selectStatistics, selectToeggeliSelectedSpaceId} from '../toeggeli.reducer';
import {Observable, Subject} from 'rxjs';
import {User} from '../user';
import {takeUntil} from 'rxjs/operators';
import {statisticsRequested} from '../toeggeli.actions';
import {Statistic} from '../../core/match.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  players$: Observable<User[]>;
  statistics: Statistic[];
  statistics$: Observable<Statistic[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.players$ = this.store.select(selectSpaceUsers);
    this.store.select(selectToeggeliSelectedSpaceId).pipe(takeUntil(this.destroy$)).subscribe(spaceID => {
      if (spaceID) {
        this.store.dispatch(statisticsRequested({spaceID}));
      }
    });
    this.statistics$ = this.store.select(selectStatistics);
    this.store.select(selectStatistics).pipe(takeUntil(this.destroy$))
      .subscribe(statistics => this.statistics = statistics);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getStatisticByUserID(userID: string): Statistic { // FIXME refactor... this is very ugly
    return this.statistics.find(statistic => statistic.userID === userID);
  }

}
