import { Component, DestroyRef, inject } from '@angular/core';
import { ButtonComponent } from '@lib/button/button.component';
import { AsideComponent } from '../components/aside/aside.component';
import { ViewComponent } from '@core/view-component';
import { AuthProxy } from '@shared/proxies/auth.proxies';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsideComponent, ButtonComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends ViewComponent {

  private authProxy = inject(AuthProxy);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  email: string = '';
  password: string = '';

  onLogin(): void {
    this.authProxy.login(
      this.email,
      this.password
    ).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.session.setUser(res.user);
          this.authService.setAuthToken(res.token);
          this.navigation.forward('home');
          console.log(this.session.user)
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  onAuth() {
    this.navigation.forward('/auth/register');
  }
}
