import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@checkout/checkout.component').then(p => p.CheckoutComponent),
    children: [
      {
        path: 'choose-address',
        loadComponent: () => import('@checkout/choose-address/choose-address.component').then(p => p.ChooseAddressComponent)
      }
    ]
  }
];