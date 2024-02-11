import { CanActivateFn } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('admin-token');

  if (!token) return false;

  return true;
};
