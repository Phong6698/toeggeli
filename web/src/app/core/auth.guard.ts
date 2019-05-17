import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser().then(
        user => {
          return resolve(true);
        },
        err => {
          this.router.navigate(['/auth']);
          return resolve(false);
        }
      );
    });
  }
}
