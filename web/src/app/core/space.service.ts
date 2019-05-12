import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { from } from 'rxjs';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  constructor(private af: AngularFirestore, private userService: UserService) {}

  addSpace(name, userId) {
    const uid = this.af.createId();
    const batch = firebase.firestore().batch();

    const spaceDoc = this.af.doc(`Spaces/${uid}`).ref;
    const userDoc = this.af.doc(`Users/${userId}`).ref;

    batch.set(spaceDoc, { name });
    batch.update(userDoc, {
      spaces: firebase.firestore.FieldValue.arrayUnion(uid)
    });

    return from(batch.commit());
  }
}
