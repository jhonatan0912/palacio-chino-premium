import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TitleMobileComponent } from '@shared/components/auth-title/auth-title.component';
import { ViewComponent } from '@core/view-component';
import { IonSpinner, IonIcon } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { finalize } from 'rxjs/internal/operators/finalize';
import { AuthProxy } from '@shared/proxies';
import { AuthService } from '@auth/services/auth.service';
import { AuthAsideComponent } from '@auth/components/aside/aside.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonIcon, IonSpinner, AuthAsideComponent, TitleMobileComponent, ButtonComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends ViewComponent {

  private readonly _authProxy = inject(AuthProxy);
  private readonly _authService = inject(AuthService);
  private readonly _destroyRef = inject(DestroyRef);

  busy: boolean = false;
  email: string = '';
  password: string = '';
  errors: string[] = [];
  inputType: 'password' | 'text' = 'password';

  onLogin(): void {
    if (!this.areValidFields()) return;
    this.busy = true;

    this._authProxy.login(
      this.email,
      this.password
    ).pipe(
      takeUntilDestroyed(this._destroyRef),
      finalize(() => this.busy = false)
    ).subscribe({
      next: (res) => {
        this.session.setUser(res.user);
        this._authService.setTokens(res.token, res.refreshToken);
        this.navigation.forward('/profile');
        window.location.reload();
      },
      error: (err) => {
        if (!Array.isArray(err.message)) {
          this.errors.push(err.message);
          setTimeout(() => this.errors = [], 1500);
          return;
        };
        this.errors = err.message;
        setTimeout(() => this.errors = [], 1500);
      }
    });
  }

  areValidFields(): boolean {
    return (
      this.email.length > 5 &&
      this.password.length > 5
    );
  }

  onToggleInputType(): void {
    this.inputType = this.inputType === 'password'
    ? 'text'
    : 'password';
  }

  onAuth() {
    this.navigation.forward('/auth/register');
  }

  onBack(): void {
    this.navigation.back('/');
  }
}
