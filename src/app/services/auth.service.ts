import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;
  userName: string = '';
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  signInPopupGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  saveUserData(user) {
    this.userName = user;
    this.loggedIn = true;
  }

  signOut() {
    this.afAuth.auth.signOut().then(data => {
      this.userName = '';
      this.loggedIn = false;
      this.router.navigate(['login']);
    });
  }
}
