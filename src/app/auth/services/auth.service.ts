import { Injectable } from '@angular/core';
import { AUTH_TOKEN } from '@core/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setAuthToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  getAuthToken(): string {
    const token = localStorage.getItem(AUTH_TOKEN);
    return token ? token : '';
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN);
  }

}
