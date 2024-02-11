import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppNavigationService } from '@core/index';

export const adminDashboardGuard: CanActivateFn = (route, state) => {
  const navigation = inject(AppNavigationService);
  const token = localStorage.getItem('admin-token');

  if (token) {
    console.log('Admin token found');
    return true;
  }

  console.log('No admin token');
  navigation.forward('/admin');
  return false;
};