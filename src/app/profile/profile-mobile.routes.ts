import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@profile/profile-mobile/profile-mobile.component').then(p => p.ProfileMobileComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('@profile/orders/orders.component').then(p => p.OrdersComponent)
  },
  {
    path: 'addresses',
    loadComponent: () => import('@profile/addresses/addresses.component').then(p => p.AddressesComponent),
    // children: [
    //   {
    //     path: 'list',
    //     loadComponent: () => import('@profile/addresses/add/add.component').then(p => p.AddComponent)
    //   },
    //   {
    //     path: 'form/:action',
    //     loadComponent: () => import('@profile/addresses/edit/edit.component').then(p => p.EditComponent)
    //   }
    // ]
  }
];