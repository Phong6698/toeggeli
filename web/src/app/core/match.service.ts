import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private angularFirestore: AngularFirestore) {}

  createMatch(match: Match) {
    const docID = this.angularFirestore.createId();
    return from(this.angularFirestore.collection('Matches').doc(docID).set(match));
  }
}

export interface Match {
  players: {userID: string, side: string}[];
  blueScore: number;
  redScore: number;
  spaceID: string;
  timestamp: Date;
}
