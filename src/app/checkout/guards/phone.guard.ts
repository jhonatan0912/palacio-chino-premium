import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppNavigationService, AppNotifyService, AppSessionService } from 'pc-core';


export const phoneGuard: CanActivateFn = (): boolean => {
  const session = inject(AppSessionService);
  const notify = inject(AppNotifyService);
  const navigation = inject(AppNavigationService);

  if (!session.user?.phone) {
    notify.error('Por favor, añada su número de teléfono para continuar', 1500);

    setTimeout(() => {
      navigation.forward('/profile/personal-information', { redirect: 'checkout' });
      return false;
    }, 1500);
  }

  return true;
};