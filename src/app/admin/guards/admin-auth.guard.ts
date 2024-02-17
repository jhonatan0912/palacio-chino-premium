import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppNavigationService } from '@core/index';
import { isValidJwtToken } from '@core/utils/is-valid-jwt-token';

export const adminDashboardGuard: CanActivateFn = (route, state) => {
  const navigation = inject(AppNavigationService);
  const token = localStorage.getItem('admin-token');

  if (token && isValidJwtToken(token)) {
    return true;
  }

  navigation.forward('/admin');
  return false;
};