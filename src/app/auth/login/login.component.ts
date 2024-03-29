import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from '@core/view-component';
import { ButtonComponent } from '@lib/button/button.component';
import { AuthProxy } from '@shared/proxies/auth.proxies';
import { AuthAsideComponent } from '../components/aside/aside.component';
import { AuthService } from '../services/auth.service';
import { AuthTitleComponent } from '@auth/components/auth-title/auth-title.component';
import { finalize } from 'rxjs';
import { IonSpinner } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonSpinner, AuthAsideComponent, AuthTitleComponent, ButtonComponent, FormsModule],
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

  onLogin(): void {
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
        this._authService.setAuthToken(res.token);
        this._authService.setRefreshToken(res.refreshToken);
        this.navigation.forward('home');
      },
      error: (err) => {
        console.error(err.message);
      }
    });
  }

  onAuth() {
    this.navigation.forward('/auth/register');
  }

  onBack(): void {
    this.navigation.back('/menu');
  }
}
