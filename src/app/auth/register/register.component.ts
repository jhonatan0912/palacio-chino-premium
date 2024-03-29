import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AuthTitleComponent } from '@auth/components/auth-title/auth-title.component';
import { ViewComponent } from '@core/view-component';
import { ButtonComponent } from '@lib/button/button.component';
import { AuthProxy } from '@shared/proxies/auth.proxies';
import { AuthAsideComponent } from '../components/aside/aside.component';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs';
import { IonSpinner } from "@ionic/angular/standalone";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonSpinner, AuthTitleComponent, AuthAsideComponent, ButtonComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends ViewComponent {

  private authProxy = inject(AuthProxy);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  busy: boolean = false;
  fullName: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';

  onRegister(): void {
    if (this.isInvalidFields()) return;
    this.busy = true;

    this.authProxy.register(
      this.fullName,
      this.email,
      this.password
    ).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.busy = false)
    ).subscribe({
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

  onBack(): void {
    this.navigation.back('/menu');
  }
}
