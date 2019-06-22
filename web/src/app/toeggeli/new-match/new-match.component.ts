import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/store/app-store.reducer';
import {Match} from 'src/app/core/match.service';
import {PlayerSelectDialogComponent} from '../player-select-dialog/player-select-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {matchCreationRequested} from '../toeggeli.actions';
import {selectSpaceUsers, selectToeggeliSelectedSpaceId} from '../toeggeli.reducer';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {User} from '../user';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})
export class NewMatchComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  spaceID: string;

  bluePlayers = [];
  redPlayers = [];
  blueScore = 0;
  redScore = 0;

  scores = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ];

  private users: User[];

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.select(selectSpaceUsers).pipe(takeUntil(this.destroy$))
      .subscribe(users => this.users = users);


    this.store.select(selectToeggeliSelectedSpaceId).pipe(takeUntil(this.destroy$))
      .subscribe(spaceID => {
        this.clearAllPlayers();
        this.spaceID = spaceID;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createNewMatch() {
    if (this.isSubmitNewMatchAllowed) {
      const players = this.bluePlayers.concat(this.redPlayers).map(player => {
        return {userID: player.userID, side: player.side};
      });
      const newMatch: Match = {
        players,
        blueScore: this.blueScore,
        redScore: this.redScore,
        spaceID: this.spaceID,
        timestamp: new Date()
      };
      this.store.dispatch(matchCreationRequested({match: newMatch}));
    }

  }

  increaseBlueScore() {
    if (this.blueScore < 10) {
      this.blueScore++;
    }
  }

  decreaseBlueScore() {
    if (this.blueScore > 0) {
      this.blueScore--;
    }
  }

  increaseRedScore() {
    if (this.redScore < 10) {
      this.redScore++;
    }
  }

  decreaseRedScore() {
    if (this.redScore > 0) {
      this.redScore--;
    }
  }

  openPlayerSelectDialog(side?: string) {

    let playersNotInTeam = this.users;
    let data;
    if (side) {
      playersNotInTeam = playersNotInTeam.filter(player => {
        if (side === 'blue') {
          return !this.redPlayers.find(matchPlayer => matchPlayer.userID === player.id);
        } else if (side === 'red') {
          return !this.bluePlayers.find(matchPlayer => matchPlayer.userID === player.id);
        }
      });
      data = {
        side,
        players: playersNotInTeam,
        selected: this.bluePlayers.concat(this.redPlayers)
      };
    } else {
      data = {
        players: playersNotInTeam,
        selected: this.bluePlayers.concat(this.redPlayers)
      };
    }

    const dialogRef = this.dialog.open(PlayerSelectDialogComponent, {
      minWidth: '300px',
      maxWidth: '400px',
      minHeight: '100px',
      maxHeight: '600px',
      data
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result) {
        if (side === 'blue') {
          this.bluePlayers = result;
        } else if (side === 'red') {
          this.redPlayers = result;
        } else {
          this.bluePlayers = result.filter(p => p.side === 'blue');
          this.redPlayers = result.filter(p => p.side === 'red');
        }
      }
    });
  }

  clearAllPlayers() {
    if (this.isClearAllPlayersAllowed) {
      this.bluePlayers = [];
      this.redPlayers = [];
    }
  }

  onBlueScoreChange(blueScore) {
    if (blueScore !== 10) {
      this.redScore = 10;
    } else {
      this.redScore = 0;
    }
  }

  onRedScoreChange(redScore) {
    if (redScore !== 10) {
      this.blueScore = 10;
    } else {
      this.blueScore = 0;
    }
  }

  get isSubmitNewMatchAllowed(): boolean {
    return this.bluePlayers.length === 2
      && this.redPlayers.length === 2
      && !(this.blueScore === 10 && this.redScore === 10)
      && (this.blueScore === 10 || this.redScore === 10)
      && this.spaceID != null;
  }

  get isClearAllPlayersAllowed(): boolean {
    return this.bluePlayers.length > 0 || this.redPlayers.length > 0;
  }


}

