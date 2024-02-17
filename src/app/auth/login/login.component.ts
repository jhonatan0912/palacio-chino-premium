import { Component } from '@angular/core';
import { ButtonComponent } from '@lib/button/button.component';
import { AsideComponent } from '../components/aside/aside.component';
import { ViewComponent } from '@core/view-component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsideComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends ViewComponent{

  login(): void { }

  onAuth() {
    this.router.forward('/auth/register');
  }
}
