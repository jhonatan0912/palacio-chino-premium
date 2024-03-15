import { Injectable } from '@angular/core';
import { AUTH_TOKEN, REFRESH_TOKEN } from '@core/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setAuthToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  getAuthToken(): string | undefined {
    const token = localStorage.getItem(AUTH_TOKEN);
    return token ? token : undefined;
  }

  getRefreshToken(): string | undefined {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    return refreshToken ? refreshToken : undefined;
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

}
