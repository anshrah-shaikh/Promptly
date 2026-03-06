import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '../api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   // ⭐ ADD THIS

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],   // ⭐ ADD HERE
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';
  loginError = '';

  constructor(private api: Api, private router: Router) {}

  login(form: any) {

  if (form.invalid) {
    return;   // stops login but shows validation
  }

  this.loginError = '';

  this.api.login({
    username: this.username,
    password: this.password
  }).subscribe({
    next: (res: any) => {

      if (!res.token) {
        this.loginError = "🚫 The admin spirits rejected you.";
        return;
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      this.router.navigate(['/dashboard']);
    },
    error: () => {
      this.loginError = "🧙‍♂️ Wrong credentials. The gatekeeper is unimpressed.";
    }
  });
}
}