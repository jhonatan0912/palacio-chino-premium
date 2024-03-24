import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { AppNavigationService, AppSessionService } from '@core/index';

export const loginGuard: CanActivateFn = (): boolean => {
  const authService = inject(AuthService);
  const sessionService = inject(AppSessionService);
  const navigationService = inject(AppNavigationService);

  if (!authService.getAuthToken() && !sessionService.user)
    return true;

  navigationService.forward('/profile');
  return false;
};