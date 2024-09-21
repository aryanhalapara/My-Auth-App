import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = { email: '', password: '' };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.register(this.user).subscribe(
      response => {
        this.successMessage = 'Registration successful! You can now log in.';
        this.errorMessage = null;
      },
      error => {
        this.errorMessage = 'Registration failed. Please try again.';
        this.successMessage = null;
      }
    );
  }
}
