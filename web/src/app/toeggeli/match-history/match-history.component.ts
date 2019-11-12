import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app-store.reducer';
import {Observable, Subject} from 'rxjs';
import {Match} from '../../core/match.service';
import {selectMatchHistory, selectSpaceUsers, selectToeggeliSelectedSpaceId} from '../toeggeli.reducer';
import {matchHistoryRequested} from '../toeggeli.actions';
import {takeUntil} from 'rxjs/operators';
import {User} from '../user';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.scss']
})
export class MatchHistoryComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  matches$: Observable<Match[]>;
  users: User[];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(selectToeggeliSelectedSpaceId).pipe(takeUntil(this.destroy$)).subscribe(spaceID => {
      if (spaceID) {
        this.store.dispatch(matchHistoryRequested({spaceID}));
      }
    });
    this.matches$ = this.store.select(selectMatchHistory);
    this.store.select(selectSpaceUsers).pipe(takeUntil(this.destroy$))
      .subscribe(users => this.users = users);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPlayerFromMatch(players: any[], team: 'blue' | 'red', index: 0|1): User {
    const userID = players.filter(player => player.side === team)[index].userID;
    return this.users.find(user => user.id === userID);
  }

}
