import { Component } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon } from '@ionic/angular/standalone';


interface HeaderOption {
  name: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends ViewComponent {

  options: HeaderOption[] = [
    { name: 'PROMOCIONES', path: 'category/1' },
    { name: 'LOCAL', path: 'establishments' },
    { name: 'ZONAS DE REPARTO', path: 'delivery-zones' },
    { name: 'Pedir online', path: 'category/1' },
  ];

  navigateToHome() {
    this.router.forward('home');
  }

  onAuth() {
    this.router.forward('/auth/login');
  }

}
