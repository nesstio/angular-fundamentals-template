import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  @Output() submitForm = new EventEmitter<{ email: string; password: string }>();
  
  //Use the names `email` and `password` for form controls.
  email = '';
  password = '';

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitForm.emit({ email: this.email, password: this.password });
    } else {
      this.loginForm.control.markAllAsTouched();
    }
  }
}
