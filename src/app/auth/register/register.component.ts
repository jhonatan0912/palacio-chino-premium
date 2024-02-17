import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from '@core/view-component';
import { ButtonComponent } from '@lib/button/button.component';
import { AsideComponent } from '../components/aside/aside.component';
import { AuthProxy } from '@shared/proxies/auth.proxies';
import { AuthService } from '../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AsideComponent, ButtonComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends ViewComponent {

  private authProxy = inject(AuthProxy);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  fullName: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';

  onRegister(): void {
    if (this.isInvalidFields()) return;

    this.authProxy.register(
      this.fullName,
      this.email,
      this.password
    ).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.session.setUser(res.user);
          this.authService.setAuthToken(res.token);
          this.navigation.forward('/dashboard');
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  isInvalidFields(): boolean {
    return (
      this.fullName.length < 5 ||
      !this.email.includes('@') ||
      this.password.length < 5 ||
      this.password !== this.passwordConfirm
    );
  }

  onAuth() {
    this.navigation.forward('/auth/login');
  }
}
