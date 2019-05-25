import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/store/app-store.reducer';
import {MatchCreationRequested} from '../toeggeli.actions';
import {Match} from 'src/app/core/match.service';
import {PlayerSelectDialogComponent} from '../player-select-dialog/player-select-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})
export class NewMatchComponent implements OnInit {

  newMatch: Match = {
    players: [
      {userID: 'player1', side: 'blue'},
      {userID: 'player2', side: 'blue'},
      {userID: 'userID_Player3', side: 'red'},
      {userID: 'userID_Player4', side: 'red'}
    ],
    blueScore: 0,
    redScore: 0,
    spaceID: 'spaceID_Raiffeisen',
    timestamp: new Date()
  };

  scores = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ];

  private players = [
    {userID: 'player1', username: 'player1'},
    {userID: 'player2', username: 'player2'},
    {userID: 'player3', username: 'player3'},
    {userID: 'player4', username: 'player4'},
    {userID: 'player5', username: 'player5'},
    {userID: 'player6', username: 'player6'},
    {userID: 'player7', username: 'player7'},
    {userID: 'player8', username: 'player8'}
  ];

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  createNewMatch() {
    this.store.dispatch(new MatchCreationRequested({match: this.newMatch}));
  }

  // FIXME angular (module toeggeli) does not detect changes until click somewhere else or change menu in sidenav

  increaseBlueScore() {
    if (this.newMatch.blueScore < 10) {
      this.newMatch.blueScore++;
    }
  }

  decreaseBlueScore() {
    if (this.newMatch.blueScore > 0) {
      this.newMatch.blueScore--;
    }
  }

  increaseRedScore() {
    if (this.newMatch.redScore < 10) {
      this.newMatch.redScore++;
    }
  }

  decreaseRedScore() {
    if (this.newMatch.redScore > 0) {
      this.newMatch.redScore--;
    }
  }

  openPlayerSelectDialog(side: string) {

    const playersNotInTeam = this.players.filter(player => {
      return !this.newMatch.players.find(matchPlayer => matchPlayer.userID === player.userID);
    });

    const dialogRef = this.dialog.open(PlayerSelectDialogComponent, {
      minWidth: '400px',
      minHeight: '100px',
      maxHeight: '600px',
      data: {
        side: side,
        players: playersNotInTeam
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}

