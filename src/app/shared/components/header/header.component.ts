import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { PopoverController } from '@ionic/angular';
import { IonIcon } from '@ionic/angular/standalone';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';


interface HeaderOption {
  name: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonIcon, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends ViewComponent {

  private popoverController = inject(PopoverController);

  options: HeaderOption[] = [
    { name: 'PROMOCIONES', path: 'category/1' },
    { name: 'LOCAL', path: 'establishments' },
    { name: 'ZONAS DE REPARTO', path: 'delivery-zones' },
    { name: 'Pedir online', path: 'category/1' },
  ];

  navigateToHome() {
    this.navigation.forward('home');
  }

  onAuth() {
    this.navigation.forward('/auth/login');
  }

  async onCart(event: Event): Promise<void> {
    const popover = await this.popoverController.create({
      component: ShoppingCartComponent,
      event,
      arrow: false,
      alignment: 'end'
    });

    await popover.present();
  }

}
