import { Routes } from '@angular/router';
import { adminDashboardGuard } from './guards/admin-auth.guard';


export const routes: Routes = [
  {
    path: '',
    canActivate: [adminDashboardGuard],
    loadComponent: () => import('@admin/admin.component').then(p => p.AdminComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('@admin/pages/dashboard/dashboard.component').then(p => p.DashboardComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('@admin/pages/categories/categories.component').then(p => p.AdminCategoriesComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('@admin/pages/users/users.component').then(p => p.AdminUsersComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('@admin/pages/products/products.component').then(p => p.ProductsComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('@admin/pages/orders/orders.component').then(p => p.OrdersComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];