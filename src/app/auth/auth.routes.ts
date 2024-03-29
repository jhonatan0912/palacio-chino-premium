import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';


export const routes: Routes = [
  {
    path: '',
    canActivate: [loginGuard],
    loadComponent: () => import('@auth/auth.component').then(p => p.AuthComponent),
    children: [
      {
        path: 'register',
        loadComponent: () => import('@auth/register/register.component').then(p => p.RegisterComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('@auth/login/login.component').then(p => p.LoginComponent)
      },
      { path: '**', redirectTo: 'register', pathMatch: 'full' }
    ]
  }
];