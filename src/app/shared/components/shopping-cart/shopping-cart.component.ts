import { Component } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent extends ViewComponent {

  constructor() {
    super();
  }

}
