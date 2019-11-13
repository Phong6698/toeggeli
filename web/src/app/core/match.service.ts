import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from} from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private angularFirestore: AngularFirestore) {
  }

  createMatch(match: Match) {
    const docID = this.angularFirestore.createId();
    return from(this.angularFirestore.collection('Matches').doc(docID).set({...match, timestamp: this.timestamp}));
  }

  getMatchHistory(spaceID: string) {
    return this.angularFirestore.collection('Matches', ref => {
      return ref.where('spaceID', '==', spaceID);
    }).stateChanges();
  }

  getStatistics(spaceID: string) {
    return this.angularFirestore.collection('Statistics', ref => {
      return ref.where('spaceID', '==', spaceID);
    }).stateChanges();
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}

export interface Match {
  id?: string;
  players: { userID: string, side: string }[];
  blueScore: number;
  redScore: number;
  spaceID: string;
  timestamp: firebase.firestore.Timestamp;
}

export interface Statistic {
  id: string;
  userID: string;
  spaceID: string;
  wins: number;
  losses: number;
  elo: number;
}
