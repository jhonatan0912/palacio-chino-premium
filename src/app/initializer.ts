import { Injector } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { AppSessionService } from '@core/services/session.service';
import { Platform } from '@ionic/angular';
import { AuthProxy } from '@shared/proxies/auth.proxies';
import { CategoriesProxy } from '@shared/proxies/categories.proxies';
import { ProductsProxy } from '@shared/proxies/products.proxie';
import { CategoriesService } from '@shared/services/categories.service';
import { ProductsService } from '@shared/services/products.service';
import { tap } from 'rxjs';

const getCategories = (injector: Injector): void => {
  const categoriesService = injector.get(CategoriesService);
  const categoriesProxy = injector.get(CategoriesProxy);

  categoriesProxy.getAll()
    .subscribe((categories) => {
      categoriesService.categories.set(categories);
    });
};

const getProducts = (injector: Injector): void => {
  const productsService = injector.get(ProductsService);
  const productsProxy = injector.get(ProductsProxy);

  productsProxy.getAll()
    .subscribe((products) => {
      productsService.products.set(products);
    });
};

export const appInitializer = (injector: Injector) => {
  const authProxy = injector.get(AuthProxy);
  const authService = injector.get(AuthService);
  const appSessionService = injector.get(AppSessionService);
  const platform = injector.get(Platform);
  const token = authService.getAuthToken();

  return () => {
    return new Promise<void>((resolve, reject) => {
      getCategories(injector);
      getProducts(injector);
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
