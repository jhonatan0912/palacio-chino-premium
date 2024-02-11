import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppNavigationService } from '@core/index';

export const adminLoginGuard: CanActivateFn = (route, state) => {
  const navigation = inject(AppNavigationService);
  const token = localStorage.getItem('admin-token');

  if (!token) {
    console.log('No admin token');
    return true;
  }

  console.log('Admin token found');
  navigation.forward('/admin-dashboard');
  return false;
};