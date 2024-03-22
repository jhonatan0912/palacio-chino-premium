import { Routes } from '@angular/router';
import { adminDashboardGuard } from './admin/guards/admin-auth.guard';
import { adminLoginGuard } from './admin/guards/admin-login.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(p => p.HomeComponent),
    children: [
      {
        path: 'menu',
        loadComponent: () => import('./menu/menu.component').then(p => p.MenuComponent)
      },
      {
        path: 'promotions',
        loadComponent: () => import('./promotions/promotions.component').then(p => p.PromotionsComponent)
      },
      {
        path: 'establishments',
        loadComponent: () => import('./establishments/establishments.component').then(p => p.EstablishmentsComponent)
      },
      {
        path: 'delivery-zones',
        loadComponent: () => import('./delivery-zones/delivery-zones.component').then(p => p.DeliveryZonesComponent)
      },
      {
        path: 'category/:id',
        loadComponent: () => import('./category/category.component').then(p => p.CategoryComponent)
      },
      { path: '', redirectTo: 'menu', pathMatch: 'full' }
    ]
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(p => p.ProfileComponent),
    children: [
      {
        path: 'addresses',
        children: [
          {
            path: '',
            loadComponent: () => import('./profile/addresses/addresses.component').then(p => p.AddressesComponent),
          },
          {
            path: 'add',
            loadComponent: () => import('./profile/addresses/address-form/address-form.component').then(p => p.AddressFormComponent)
          }
        ]
      },
      {
        path: 'orders',
        loadComponent: () => import('./profile/orders/orders.component').then(p => p.OrdersComponent)
      },
      {
        path: 'personal-information',
        loadComponent: () => import('./profile/personal-information/personal-information.component').then(p => p.PersonalInformationComponent)
      },
      { path: '**', redirectTo: 'personal-information', pathMatch: 'full' }
    ]
  },
  {
    path: 'auth',
    children: [
      { path: 'register', loadComponent: () => import('./auth/register/register.component').then(p => p.RegisterComponent) },
      { path: 'login', loadComponent: () => import('./auth/login/login.component').then(p => p.LoginComponent) },
      { path: '**', redirectTo: 'register', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    canActivate: [adminLoginGuard],
    loadComponent: () => import('./admin/login/login.component').then(p => p.AdminLoginComponent)
  },
  {
    path: 'admin-dashboard',
    canActivate: [adminDashboardGuard],
    loadComponent: () => import('./admin/admin.component').then(p => p.AdminComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('@admin/dashboard/dashboard.component').then(p => p.DashboardComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./admin/categories/categories.component').then(p => p.AdminCategoriesComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./admin/users/users.component').then(p => p.AdminUsersComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./admin/products/products.component').then(p => p.ProductsComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./admin/orders/orders.component').then(p => p.OrdersComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
