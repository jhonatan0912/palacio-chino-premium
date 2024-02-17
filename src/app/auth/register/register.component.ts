import { Component } from '@angular/core';
import { ButtonComponent } from '@lib/button/button.component';
import { AsideComponent } from '../components/aside/aside.component';
import { ViewComponent } from '@core/view-component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AsideComponent, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends ViewComponent {

  register(): void { }

  onAuth() {
    this.router.forward('/auth/login');
  }
}
