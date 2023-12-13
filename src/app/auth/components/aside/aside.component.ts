import { Component } from '@angular/core';
import { ViewComponent } from '@core/view-component';

@Component({
  selector: 'auth-aside',
  standalone: true,
  imports: [],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent extends ViewComponent {

  navigateToHome() {
    this.router.forward('/');
  }
}
