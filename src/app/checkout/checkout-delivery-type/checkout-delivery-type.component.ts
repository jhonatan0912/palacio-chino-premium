import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { IonRadio } from "@ionic/angular/standalone";

export type DeliveryType = 'delivery' | 'pickup';
export type PaymentMethod = 'cash' | 'card';

interface DeliveryOption {
  id: DeliveryType;
  name: string;
}

interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
}

@Component({
  selector: 'checkout-delivery-type',
  standalone: true,
  imports: [IonRadio, NgClass],
  templateUrl: './checkout-delivery-type.component.html',
  styleUrls: ['./checkout-delivery-type.component.scss']
})
export class CheckoutDeliveryTypeComponent {

  deliveryTypeId: DeliveryType = 'delivery';
  paymentMethodId: PaymentMethod = 'cash';

  deliveryTypeOptions: DeliveryOption[] = [
    { id: 'delivery', name: 'Delivery' },
    { id: 'pickup', name: 'Recojo en tienda' },
  ];
  paymentMethods: PaymentMethodOption[] = [
    { id: 'cash', name: 'Efectivo' },
    { id: 'card', name: 'Tarjeta' },
  ];

  onSelectDeliveryType(id: DeliveryType): void {
    this.deliveryTypeId = id;
  }

  onSelectPaymentMethod(id: PaymentMethod): void {
    this.paymentMethodId = id;
  }
}
