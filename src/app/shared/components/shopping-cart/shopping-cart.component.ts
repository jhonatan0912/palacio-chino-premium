import { Component, inject } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon, PopoverController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent extends ViewComponent {

  private popoverCtrl = inject(PopoverController);

  constructor() {
    super();
  }

  dismiss(): void {
    this.popoverCtrl.dismiss('cancel');
  }

}
