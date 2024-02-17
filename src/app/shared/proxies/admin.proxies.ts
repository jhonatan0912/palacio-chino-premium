import { Injectable, inject } from '@angular/core';
import { AppHttpService } from '@core/index';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminProxy {

  private http = inject(AppHttpService);

  get path(): string {
    return `${environment.api}/api/v1/admin`;
  }

  login(username: string, password: string): Observable<LoginDto> {
    const body = {
      username,
      password
    };
    return this.http.post(`${this.path}/login`, body).pipe(map((data: any) => new LoginDto().fromJS(data)));
  }
}

export class LoginDto {

  username!: string;
  token!: string;

  init(data: any): void {
    if (data) {
      this.username = data.username;
      this.token = data.token;
    }
  }

  fromJS(data: any): LoginDto {
    data = typeof data === 'object' ? data : {};
    const result = new LoginDto();
    result.init(data);
    return result;
  };
}