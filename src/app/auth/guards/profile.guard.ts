import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { AppNavigationService, AppSessionService } from '@core/index';

export const profileGuard: CanActivateFn = (): boolean => {
  const authService = inject(AuthService);
  const sessionService = inject(AppSessionService);
  const navigation = inject(AppNavigationService);

  if (!authService.getAuthToken() || !sessionService.user) {
    navigation.forward('/');
    return false;
  }

  return true;
};