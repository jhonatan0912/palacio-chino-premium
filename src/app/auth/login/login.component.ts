import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AuthAsideComponent } from '@auth/components/aside/aside.component';
import { AuthService } from '@auth/services/auth.service';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { TitleMobileComponent } from '@shared/components/auth-title/auth-title.component';
import { InputValidatorDirective } from '@shared/directives/inputValidator.directive';
import { ViewComponent } from 'pc-core';
import { AuthProxy } from 'pc-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonIcon, IonSpinner, AuthAsideComponent, TitleMobileComponent, ButtonComponent, FormsModule, InputValidatorDirective],
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
  validFields = {
    email: false,
    password: false
  };

  onLogin(): void {
    if (!this.validFields.email || !this.validFields.password) return;
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
