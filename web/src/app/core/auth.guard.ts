import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, public router: Router) {}

  canActivate(): Observable<boolean> {
    const authenticated: Subject<boolean> = new Subject();
    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if (!firebaseUser) {
        this.router.navigate(['/auth']);
        authenticated.next(false);
      } else {
        authenticated.next(true);
      }
      authenticated.complete();
    });
    return authenticated;
  }
}
