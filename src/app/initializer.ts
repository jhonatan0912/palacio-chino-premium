import { Injector } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { AppSessionService } from '@core/services/session.service';
import { SHOPPING_CART } from '@core/utils/constants';
import { AuthProxy } from '@shared/proxies/auth.proxies';
import { CategoriesProxy } from '@shared/proxies/categories.proxies';
import { ProductsProxy } from '@shared/proxies/products.proxie';
import { CategoriesService } from '@shared/services/categories.service';
import { ProductsService } from '@shared/services/products.service';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

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
    .subscribe((response) => {
      productsService.products.set(response.products);
    });
};

const getSession = (injector: Injector) => {
  const authProxy = injector.get(AuthProxy);
  authProxy.getSession()
    .subscribe({
      next: (user) => {
        const appSessionService = injector.get(AppSessionService);
        appSessionService.setUser(user);
      },
      error: () => {
        tryWithRefreshToken(injector);
      }
    });
};

const tryWithRefreshToken = (injector: Injector) => {
  const authService = injector.get(AuthService);
  const authProxy = injector.get(AuthProxy);
  const refreshToken = authService.getRefreshToken();
  if (!refreshToken) return;

  authProxy.refreshToken(refreshToken)
    .subscribe({
      next: (tokens) => {
        authService.setAuthToken(tokens.token);
        authService.setRefreshToken(tokens.refreshToken);
        getSession(injector);
      },
      error: () => {
        authService.logout();
      }
    });
};

const setCart = (injector: Injector) => {
  const cart = localStorage.getItem(SHOPPING_CART);
  const shoppingCartService = injector.get(ShoppingCartService);
  if (!cart) {
    localStorage.setItem(SHOPPING_CART, '[]');
    return;
  }
  shoppingCartService.cart.set(JSON.parse(cart));
};

export const appInitializer = (injector: Injector) => {
  const authService = injector.get(AuthService);
  const token = authService.getAuthToken();
  const refreshToken = authService.getRefreshToken();

  return () => {
    return new Promise<void>((resolve) => {
      getCategories(injector);
      getProducts(injector);
      setCart(injector);
      if (!token && !refreshToken) return resolve();

      getSession(injector);
      resolve();
    });
  };
};
