import { Routes } from '@angular/router';
import { phoneGuard } from './guards/phone.guard';


export const routes: Routes = [
  {
    path: '',
    canActivate: [phoneGuard],
    loadComponent: () => import('@checkout/checkout.component').then(p => p.CheckoutComponent),
  }
];