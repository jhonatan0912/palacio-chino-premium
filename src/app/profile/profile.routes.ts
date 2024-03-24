import { Route, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./profile.component').then(p => p.ProfileComponent),
    children: [
      {
        path: 'addresses',
        children: [
          {
            path: '',
            loadComponent: () => import('./addresses/addresses.component').then(p => p.AddressesComponent),
          },
          {
            path: 'add',
            loadComponent: () => import('./addresses/address-form/address-form.component').then(p => p.AddressFormComponent)
          }
        ]
      },
      {
        path: 'orders',
        loadComponent: () => import('./orders/orders.component').then(p => p.OrdersComponent)
      },
      // {
      //   path: 'personal-information',
      //   loadComponent: () => import('./personal-information/personal-information.component').then(p => p.PersonalInformationComponent)
      // },
      // { path: '**', redirectTo: 'personal-information', pathMatch: 'full' }
    ]
  }
];