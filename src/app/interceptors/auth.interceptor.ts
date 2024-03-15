import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AUTH_TOKEN } from '@core/utils/constants';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let clonedRequest = request;
  const token = localStorage.getItem(AUTH_TOKEN);

  if (token) {
    clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedRequest);
};
