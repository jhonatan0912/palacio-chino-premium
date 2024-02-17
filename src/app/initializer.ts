import { AppSessionService } from '@core/services/session.service';
import { AuthProxy, UserAuthResponseDto } from '@shared/proxies/auth.proxies';
import { Observable, tap } from 'rxjs';

export const appInitializer = (authProxy: AuthProxy, appSessionService: AppSessionService) => {
  return () => {
    return authProxy.getSession()
      .pipe(
        tap({
          next: (user) => {
            appSessionService.setUser(user);
          },
          error: (error) => {
            console.error('Error', error);
          }
        })
      );
  };
};
