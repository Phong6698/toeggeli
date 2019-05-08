import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {
  }

  doPasswordLogin(email, password) {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
