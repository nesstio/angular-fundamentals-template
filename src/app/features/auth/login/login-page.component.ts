import { Component } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  template: `<app-login-form (submitForm)="onSubmit($event)"></app-login-form>`,
})
export class LoginPageComponent {
  constructor(private auth: AuthService) {}
  onSubmit(payload: { email: string; password: string }) {
    this.auth.login(payload).subscribe({
      error: err => console.error('Login error:', err),
    });
  }
}