import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@checkout/checkout.component').then(p => p.CheckoutComponent),
  }
];