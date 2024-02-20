import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, Injector } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';
import { errorInterceptor } from './error.interceptor';
import { appInitializer } from './initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideIonicAngular({
      mode: 'ios',
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [Injector],
      multi: true,
    },
  ]
};
