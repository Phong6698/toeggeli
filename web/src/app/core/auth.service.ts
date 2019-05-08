import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  doPasswordLogin(email, password) {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  isLoggedIn() {
    return this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        return true;
      }
      return false;
    });
  }
}
