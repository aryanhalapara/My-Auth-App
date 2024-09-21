import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string | null = null;
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }
    this.authService.login(this.credentials).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/protected']);
    }, error => {
      this.errorMessage = 'Login failed. Please try again.'; // Handle error
    }
    );
  }
}
