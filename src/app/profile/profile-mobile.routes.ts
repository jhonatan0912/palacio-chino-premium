import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@profile/profile-mobile/profile-mobile.component').then(p => p.ProfileMobileComponent)
  },
  {
    path: 'orders',
    title: 'Mis pedidos',
    loadComponent: () => import('@profile/orders/orders.component').then(p => p.OrdersComponent)
  },
  {
    path: 'order-detail/:id',
    title: 'Detalle de pedido',
    loadComponent: () => import('./orders/order-detail/order-detail.component').then(p => p.OrderDetailComponent)
  },
  {
    path: 'addresses',
    title: 'Mis direcciones',
    loadComponent: () => import('@profile/addresses/addresses.component').then(p => p.AddressesComponent),
  },
  {
    path: 'addresses/add',
    title: 'Agregar dirección',
    loadComponent: () => import('./addresses/address-form/address-form.component').then(p => p.AddressFormComponent)
  },
  {
    path: 'addresses/form/:action',
    title: 'Agregar dirección',
    loadComponent: () => import('./addresses/address-form/address-form.component').then(p => p.AddressFormComponent)
  }, {
    path: 'personal-information',
    title: 'Datos personales',
    loadComponent: () => import('@profile/personal-information/personal-information.component').then(p => p.PersonalInformationComponent),
  }
];