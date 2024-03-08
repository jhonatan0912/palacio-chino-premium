import { Component, inject } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

@Component({
  selector: 'header-mobile',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent {

  shoppingCartService = inject(ShoppingCartService);

}
