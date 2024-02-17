import { Injectable, inject } from '@angular/core';
import { AppHttpService } from '@core/index';
import { environment } from '../../../environments/environment.development';
import { Observable, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthProxy {

  private http = inject(AppHttpService);

  get path(): string {
    return `${environment.api}/api/v1/auth`;
  }

  register(fullName: string, email: string, password: string): Observable<AuthResponseDto> {
    const body = {
      fullName,
      email,
      password
    };

    return this.http.post(`${this.path}/register`, body).pipe(mergeMap((data: any) => of(new AuthResponseDto().fromJS(data))));
  }

  login(email: string, password: string): Observable<AuthResponseDto> {
    const body = {
      email,
      password
    };

    return this.http.post(`${this.path}/login`, body).pipe(mergeMap((data: any) => of(new AuthResponseDto().fromJS(data))));
  }

  getSession(): Observable<UserAuthResponseDto> {
    return this.http.get(`${this.path}/session`).pipe(mergeMap((data: any) => of(new UserAuthResponseDto().fromJS(data))));
  }
}

export class AuthResponseDto {
  user!: UserAuthResponseDto;
  token!: string;

  init(data: any): void {
    if (data) {
      this.user = data.user;
      this.token = data.token;
    }
  }

  fromJS(data: any): AuthResponseDto {
    data = typeof data === 'object' ? data : {};
    const result = new AuthResponseDto();
    result.init(data);
    return result;
  }
}

export class UserAuthResponseDto {
  fullName!: string;
  email!: string;
  id!: string;
  isActive!: string;
  role!: string;

  init(data: any): void {
    if (data) {
      this.fullName = data.fullName;
      this.email = data.email;
      this.id = data.id;
      this.isActive = data.isActive;
      this.role = data.role;
    }
  }

  fromJS(data: any): UserAuthResponseDto {
    data = typeof data === 'object' ? data : {};
    const result = new UserAuthResponseDto();
    result.init(data);
    return result;
  }
}