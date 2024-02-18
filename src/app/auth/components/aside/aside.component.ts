import { Component } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'auth-aside',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent extends ViewComponent {

  navigateToHome() {
    this.navigation.forward('/');
  }
}
