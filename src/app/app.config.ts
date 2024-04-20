import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, Injector } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app.routes';
import { appInitializer } from './initializer';
import { adminInterceptor, authInterceptor, errorInterceptor } from './interceptors';
import { provideProxies } from "pc-proxies";
import { environment } from '@environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideProxies(environment),
    provideHttpClient(withInterceptors([
      authInterceptor,
      adminInterceptor,
      errorInterceptor
    ])),
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
