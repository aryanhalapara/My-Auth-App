import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://example.com/api'; // Replace with your API endpoint

  constructor(private http: HttpClient, private store: Store) { }

  // login(credentials: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }

  // register(user: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, user);
  // }

  // Dummy login method
  login(credentials: { email: string; password: string }): Observable<any> {
    // Simulate a successful login response
    const dummyResponse = {
      token: 'dummy-jwt-token', // Dummy token
      user: { email: credentials.email, role: 'admin', password: '123' } // Dummy user info
    };

    // Use 'of' to create an observable and 'delay' to simulate network latency
    return of(dummyResponse).pipe(delay(1000),
      tap(dummyResponse => {
        // Check dummy credentials
        if (
          credentials.email === dummyResponse.user.email &&
          credentials.password === dummyResponse.user.password
        ) {
          this.store.dispatch(loginSuccess({ token: dummyResponse.token }));
        } else {
          throw new Error('Invalid credentials'); // Simulate login failure
        }
      })); // 1-second delay
  }

  register(user: any): Observable<any> {
    // Simulate successful registration response
    return of({ success: true }).pipe(delay(1000)); // 1-second delay
  }

  logout() {
    // this.store.dispatch(this.logout());
    localStorage.removeItem('token');
  }

  public get token(): string | null {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }
}
