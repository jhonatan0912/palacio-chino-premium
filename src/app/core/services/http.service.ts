import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(url);
  }

  create(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  update(url: string, body: any): Observable<any> {
    return this.http.patch(url, body);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url);
  }

}
