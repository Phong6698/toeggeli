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

  bluePlayers = [];
  redPlayers = [];
  blueScore = 0;
  redScore = 0;

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
    if (this.isSubmitNewMatchAllowed()) {
      const newMatch: Match = {
        players: this.bluePlayers.concat(this.redPlayers),
        blueScore: this.blueScore,
        redScore: this.redScore,
        spaceID: 'spaceID_Raiffeisen',
        timestamp: new Date()
      };
      this.store.dispatch(new MatchCreationRequested({match: newMatch}));
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

    let playersNotInTeam = this.players;
    if (side) {
      playersNotInTeam = playersNotInTeam.filter(player => {
        if (side === 'blue') {
          return !this.redPlayers.find(matchPlayer => matchPlayer.userID === player.userID);
        } else if (side === 'red') {
          return !this.bluePlayers.find(matchPlayer => matchPlayer.userID === player.userID);
        }
      });
    }

    let data;
    if (side) {
      data = {
        side: side,
        players: playersNotInTeam,
        selected: this.bluePlayers.concat(this.redPlayers)
      }
    } else {
      data = {
        players: playersNotInTeam,
        selected: this.bluePlayers.concat(this.redPlayers)
      }
    }

    const dialogRef = this.dialog.open(PlayerSelectDialogComponent, {
      minWidth: '400px',
      minHeight: '100px',
      maxHeight: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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

  isSubmitNewMatchAllowed(): boolean {
    return this.bluePlayers.length === 2 && this.redPlayers.length === 2 &&
      !(this.blueScore === 10 && this.redScore === 10) && (this.blueScore === 10 || this.redScore === 10);
  }
}

