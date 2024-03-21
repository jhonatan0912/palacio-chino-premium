import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ADMIN_TOKEN, AUTH_TOKEN, REFRESH_TOKEN } from '@core/utils/constants';
import { ViewComponent } from '@core/view-component';
import { AdminProxy } from '@shared/proxies/admin.proxies';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class AdminLoginComponent extends ViewComponent implements OnInit {

  private adminProxy = inject(AdminProxy);

  username: string = '';
  password: string = '';

  constructor() {
    super();
  }

  ngOnInit() { }

  onLogin(): void {
    this.adminProxy.login(
      this.username,
      this.password
    ).subscribe({
      next: (data) => {
        localStorage.setItem(ADMIN_TOKEN, data.token);
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        this.navigation.forward('/admin-dashboard');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
