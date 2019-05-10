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
      {userID: 'userID_Player2', side : 'blue'},
      {userID: 'userID_Player3', side : 'red'},
      {userID: 'userID_Player4', side : 'red'}
    ],
    blueScore : 10,
    redScore : 6,
    spaceID : 'spaceID_Raiffeisen',
    timestamp : new Date()
  };

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  createNewMatch() {
    console.log('create new match button');
    this.store.dispatch(new MatchCreationRequested({match: this.newMatch}));
  }

}
