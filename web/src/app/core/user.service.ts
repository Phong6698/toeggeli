import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private angularFirestore: AngularFirestore) {}

  createUser(uid: string, username: string, firstName: string, lastName: string) {
    const user = {
      username: username,
      firstName: firstName,
      lastName: lastName
    }
    return from(this.angularFirestore.collection('Users').doc(uid).set(user));
  }
}
