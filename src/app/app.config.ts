import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppSessionService } from '@core/services/session.service';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { AuthProxy } from '@shared/proxies/auth.proxies';
import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';
import { appInitializer } from './initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideIonicAngular({
      mode: 'ios',
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AuthProxy, AppSessionService],
      multi: true,
    },
  ]
};
