import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/store/app-store.reducer';
import {MatchCreationRequested} from '../toeggeli.actions';
import {Match} from 'src/app/core/match.service';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})
export class NewMatchComponent implements OnInit {

  newMatch: Match = {
    players: [
      {userID: 'userID_Player1', side: 'blue'},
      {userID: 'userID_Player2', side: 'blue'},
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

  constructor(private store: Store<AppState>) {
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
}

