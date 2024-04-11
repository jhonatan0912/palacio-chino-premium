import { LoadChildrenCallback, Routes } from '@angular/router';
import { profileGuard } from '@auth/guards/profile.guard';
import { adminLoginGuard } from './admin/guards/admin-login.guard';

export const profileRoutes = (): LoadChildrenCallback => {
  return window.innerWidth < 768
    ? () => import('@profile/profile-mobile.routes').then(r => r.routes)
    : () => import('@profile/profile.routes').then(r => r.routes);
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@home/home.component').then(p => p.HomeComponent),
    children: [
      {
        path: '',
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
        path: 'galery',
        loadComponent: () => import('./galery/galery.component').then(p => p.GaleryComponent)
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
    canActivate: [profileGuard],
    loadChildren: profileRoutes()
  },
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.routes').then(r => r.routes),
  },
  {
    path: 'checkout',
    canActivate: [profileGuard],
    loadChildren: () => import('@checkout/checkout.routes').then(r => r.routes)
  },
  {
    path: 'admin',
    canActivate: [adminLoginGuard],
    loadComponent: () => import('@admin/login/login.component').then(p => p.AdminLoginComponent)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('@admin/admin.routes').then(r => r.routes)
  },
  {
    path: 'shopping-cart',
    loadComponent: () => import('@shopping-cart/shopping-cart.component').then(p => p.ShoppingCartComponent)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];