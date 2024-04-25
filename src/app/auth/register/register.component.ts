import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { IonSpinner, IonIcon } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { TitleMobileComponent } from '@shared/components/auth-title/auth-title.component';
import { ViewComponent } from 'pc-core';
import { AuthProxy } from 'pc-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';
import { AuthAsideComponent } from '../components/aside/aside.component';
import { AuthService } from '../services/auth.service';
import { InputValidatorDirective } from '@shared/directives/inputValidator.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonIcon, IonSpinner, TitleMobileComponent, AuthAsideComponent, ButtonComponent, FormsModule, InputValidatorDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends ViewComponent {

  private readonly _authProxy = inject(AuthProxy);
  private readonly _authService = inject(AuthService);
  private readonly _destroyRef = inject(DestroyRef);

  busy: boolean = false;
  fullName: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  passwordType: 'text' | 'password' = 'password';
  passwordConfirmType: 'text' | 'password' = 'password';
  validFields = {
    fullName: false,
    email: false,
    password: false,
    passwordConfirm: false
  };

  onRegister(): void {
    if (this.areInvalidFields()) return;
    this.busy = true;

    this._authProxy.register(
      this.fullName,
      this.email,
      this.password
    ).pipe(
      takeUntilDestroyed(this._destroyRef),
      finalize(() => this.busy = false)
    ).subscribe({
      next: (res) => {
        this.session.setUser(res.user);
        this._authService.setAuthToken(res.token);
        this._authService.setRefreshToken(res.refreshToken);
        this.navigation.forward('/dashboard');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  areInvalidFields(): boolean {
    return Object.values(this.validFields).some((field) => !field);
  }

  onTogglePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  onTogglePasswordConfirmVisibility(): void {
    this.passwordConfirmType = this.passwordConfirmType === 'password' ? 'text' : 'password';
  }

  onAuth() {
    this.navigation.forward('/auth/login');
  }

  onBack(): void {
    this.navigation.back('/');
  }
}
