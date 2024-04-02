import { Component } from '@angular/core';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'shopping-cart-empty',
  standalone: true,
  imports: [IonButton],
  templateUrl: './shopping-cart-empty.component.html',
  styleUrls: ['./shopping-cart-empty.component.scss']
})
export class ShoppingCartEmptyComponent { }
