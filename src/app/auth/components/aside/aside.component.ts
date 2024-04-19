import { Component } from '@angular/core';
import { ViewComponent } from 'pc-core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'aside-auth',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AuthAsideComponent extends ViewComponent {

  navigateToHome() {
    this.navigation.forward('/');
  }
}
