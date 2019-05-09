import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  constructor(private angularFirestore: AngularFirestore) {}

  addSpace(spaceName) {
    //this.angularFirestore.doc(`space???/${uid}`).valueChanges();
  }
}
