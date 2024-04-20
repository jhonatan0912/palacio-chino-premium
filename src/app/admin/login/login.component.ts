import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ADMIN_TOKEN, AUTH_TOKEN, REFRESH_TOKEN, ViewComponent } from 'pc-core';
import { IonSpinner } from "@ionic/angular/standalone";
import { finalize } from 'rxjs';
import { AdminProxy } from 'pc-proxies';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonSpinner, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class AdminLoginComponent extends ViewComponent {

  private adminProxy = inject(AdminProxy);

  busy: boolean = false;
  username: string = '';
  password: string = '';
  invalid: boolean = false;

  constructor() {
    super();
  }

  onLogin(): void {
    this.busy = true;

    this.adminProxy.login(
      this.username,
      this.password
    ).pipe(
      finalize(() => this.busy = false)
    ).subscribe({
      next: (data) => {
        localStorage.setItem(ADMIN_TOKEN, data.token);
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        this.navigation.forward('/admin-dashboard');
      },
      error: () => {
        this.invalid = true;
        setTimeout(() => this.invalid = false, 1000);
      }
    });
  }
}
