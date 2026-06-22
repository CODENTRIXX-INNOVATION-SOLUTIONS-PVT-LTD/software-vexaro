import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent {
  email = "";
  isLoading = signal(false);
  errorMessage = signal("");
  successMessage = signal("");

  onSubmit(): void {
    this.errorMessage.set("");
    this.successMessage.set("");

    if (!this.email) {
      this.errorMessage.set("Please enter your email address.");
      return;
    }

    this.isLoading.set(true);

    // Simulate API call for password reset
    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set(
        "If an account exists with this email, a password reset link has been sent."
      );
      this.email = ""; // Clear the form
    }, 1200);
  }
}
