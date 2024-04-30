import { NgClass } from '@angular/common';
import { Component, model } from '@angular/core';
import { IonRadio } from "@ionic/angular/standalone";
import { DeliveryType, PaymentMethod } from 'pc-proxies';

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

  deliveryType = model.required<DeliveryType>();
  paymentMethod = model.required<PaymentMethod>();

  deliveryTypeOptions: DeliveryOption[] = [
    { id: 'delivery', name: 'Delivery' },
    { id: 'pickup', name: 'Recojo en tienda' },
  ];
  paymentMethods: PaymentMethodOption[] = [
    { id: 'cash', name: 'Efectivo' },
    { id: 'card', name: 'Tarjeta' },
  ];
}
