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
  imports: [IonIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends ViewComponent {

  private popoverController = inject(PopoverController);

  options: HeaderOption[] = [
    { name: 'PROMOCIONES', path: 'promotions' },
    { name: 'LOCAL', path: 'establishments' },
    { name: 'ZONAS DE REPARTO', path: 'delivery-zones' },
    { name: 'Pedir online', path: 'promotions' },
  ];

  navigateToHome() {
    this.router.forward('home');
  }

  onAuth() {
    this.router.forward('/auth/register');
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
