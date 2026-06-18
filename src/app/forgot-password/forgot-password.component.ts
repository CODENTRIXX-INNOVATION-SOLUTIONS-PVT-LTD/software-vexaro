import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  email = '';
  isSubmitted = false;

  constructor(private router: Router) {}

  onSubmit(): void {
    if (!this.email) {
      alert('Please enter your email address');
      return;
    }
    
    // TODO: Connect to backend to send reset link
    this.isSubmitted = true;
  }
}
