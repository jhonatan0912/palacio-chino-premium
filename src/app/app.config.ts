import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, Injector, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '@environments/environment';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideProxies } from 'pc-proxies';
import { routes } from './app.routes';
import { appInitializer } from './initializer';
import { adminInterceptor, authInterceptor, errorInterceptor } from './interceptors';

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
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideStorage(() => getStorage())
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [Injector],
      multi: true,
    },
  ]
};
