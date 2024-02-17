import { Injectable } from '@angular/core';
import { UserAuthResponseDto } from '@shared/proxies/auth.proxies';

@Injectable({
  providedIn: 'root'
})
export class AppSessionService {

  private _user?: UserAuthResponseDto;

  setUser(user: UserAuthResponseDto) {
    this._user = user;
  };

  get user(): UserAuthResponseDto | undefined {
    return this._user ? this._user : undefined;
  }
}
