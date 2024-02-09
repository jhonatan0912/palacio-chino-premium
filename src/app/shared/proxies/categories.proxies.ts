import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, mergeMap, of } from 'rxjs';
import { AppHttpService } from '@core/services/http.service';


@Injectable({
  providedIn: 'root'
})
export class CategoriesProxy {

  private http = inject(AppHttpService);

  get path(): string {
    return `${environment.api}/api/v1/categories`;
  }

  create(icon: string, name: string, code: string): Observable<CategoryDto> {
    const body = ({
      icon,
      name,
      code
    });
    return this.http.create(this.path, body).pipe(mergeMap((data: any) => of(new CategoryDto().fromJS(data))));
  }

  get(id: string): Observable<CategoryDto> {
    return this.http.get(`${this.path}/${id}`).pipe(mergeMap((data: any) => of(new CategoryDto().fromJS(data))));
  }

}

export class CategoryDto {
  id!: string;
  code!: string;
  icon!: string;
  name!: string;

  init(data: any): void {
    if (data) {
      this.id = data.id;
      this.code = data.code;
      this.icon = data.icon;
      this.name = data.name;
    }
  }

  fromJS(data: any): CategoryDto {
    data = typeof data === 'object' ? data : {};
    const result = new CategoryDto();
    result.init(data);
    return result;
  };
}