import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ADMIN_TOKEN, AppNavigationService, isValidJwtToken } from 'pc-core';

export const adminLoginGuard: CanActivateFn = (route, state) => {
  const navigation = inject(AppNavigationService);
  const token = localStorage.getItem(ADMIN_TOKEN);

  if (!token) return true;

  if (!isValidJwtToken(token)) return true;

  navigation.forward('/admin-dashboard');
  return false;
};