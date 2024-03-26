import { Routes } from '@angular/router';
import { adminDashboardGuard } from './admin/guards/admin-auth.guard';
import { adminLoginGuard } from './admin/guards/admin-login.guard';
import { loginGuard } from '@auth/guards/login.guard';
import { profileGuard } from '@auth/guards/profile.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@home/home.component').then(p => p.HomeComponent),
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
    loadChildren: () => import('@profile/profile.routes').then(r => r.routes)
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
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
