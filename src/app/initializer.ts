import { Injector } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { AppSessionService } from '@core/services/session.service';
import { Platform } from '@ionic/angular';
import { AuthProxy } from '@shared/proxies/auth.proxies';
import { tap } from 'rxjs';

export const appInitializer = (injector: Injector) => {
  const authProxy = injector.get(AuthProxy);
  const authService = injector.get(AuthService);
  const appSessionService = injector.get(AppSessionService);
  const platform = injector.get(Platform);

  const token = authService.getAuthToken();

  return () => {
    return new Promise<void>((resolve, reject) => {
      if (!token) return resolve();

      authProxy.getSession()
        .pipe(
          tap({
            next: (user) => {
              platform.ready()
                .then(() => {
                  appSessionService.setUser(user);
                  resolve();
                });
            },
            error: (error) => {
              reject(error);
            }
          })
        ).subscribe();
      resolve();
    });
  };
};
