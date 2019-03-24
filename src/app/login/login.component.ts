import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async loginWithGoogle() {
    await this.authService.signInPopupGoogle()
      .then(data => {
        this.authService.saveUserData(data.user.displayName, data.user.photoURL);
      });
    this.router.navigate(['dashboard']);
  }

}
