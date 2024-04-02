import { Injectable } from "@angular/core";
import { UserAuthResponseDto } from '@shared/proxies';

@Injectable({ providedIn: 'root' })
export class AppSessionService {

  private _user: UserAuthResponseDto | undefined;

  get user(): UserAuthResponseDto | undefined {
    return this._user;
  };

  setUser(user: UserAuthResponseDto) {
    this._user = user;
  }

  clear() {
    this._user = undefined;
  }
}