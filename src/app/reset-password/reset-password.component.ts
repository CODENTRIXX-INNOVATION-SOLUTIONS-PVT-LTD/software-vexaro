import { Component, OnInit, signal, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  token = signal('');
  newPassword = '';
  confirmPassword = '';
  
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);
  
  passwordStrength = signal<'weak' | 'fair' | 'strong' | ''>('');
  passwordStrengthClass = signal('');
  passwordMismatch = signal(false);
  
  isLoading = signal(false);
  success = signal(false);
  countdown = signal(5);

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.token.set(params['token'] || '');
      });
  }

  checkPasswordStrength(pass: string): void {
    this.passwordMismatch.set(false);
    if (!pass) {
      this.passwordStrength.set('');
      this.passwordStrengthClass.set('');
      return;
    }

    if (pass.length < 6) {
      this.passwordStrength.set('weak');
      this.passwordStrengthClass.set('weak');
    } else {
      const hasNumber = /[0-9]/.test(pass);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
      const hasUpper = /[A-Z]/.test(pass);
      const hasLower = /[a-z]/.test(pass);

      if (pass.length >= 8 && hasNumber && hasSpecial && hasUpper && hasLower) {
        this.passwordStrength.set('strong');
        this.passwordStrengthClass.set('strong');
      } else {
        this.passwordStrength.set('fair');
        this.passwordStrengthClass.set('fair');
      }
    }
  }

  toggleNewPassword(): void {
    this.showNewPassword.update(v => !v);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update(v => !v);
  }

  onSubmit(): void {
    this.passwordMismatch.set(false);

    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatch.set(true);
      return;
    }

    if (this.passwordStrength() === 'weak') {
      return;
    }

    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
      this.success.set(true);
      this.startCountdown();
    }, 1500);
  }

  private startCountdown(): void {
    const interval = setInterval(() => {
      this.countdown.update(c => {
        if (c <= 1) {
          clearInterval(interval);
          this.router.navigate(['/login']);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }
}
