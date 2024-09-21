import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-auth-app';

  constructor(public authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout(); // Call the logout method
    this.router.navigate(['/auth/login']); // Navigate to the login page
  }
}
