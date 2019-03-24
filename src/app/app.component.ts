import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newsApp';

  constructor(private auth: AuthService, private router: Router) {

  }

  loginNav() {
    this.router.navigate(['login']);
  }

  logout() {
    this.auth.signOut();
  }
}
