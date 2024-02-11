import { Injectable, inject } from '@angular/core';
import { AppHttpService } from '@core/services/http.service';
import { Observable, mergeMap, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CategoriesProxy {

  private http = inject(AppHttpService);

  get path(): string {
    return `${environment.api}/api/v1/categories`;
  }

  create(icon: string, name: string, slug: string): Observable<CategoryDto> {
    const body = ({
      icon,
      name,
      slug
    });
    return this.http.create(this.path, body).pipe(mergeMap((data: any) => of(new CategoryDto().fromJS(data))));
  }

  get(id: string): Observable<CategoryDto> {
    return this.http.get(`${this.path}/${id}`).pipe(mergeMap((data: any) => of(new CategoryDto().fromJS(data))));
  }

  getAll(): Observable<CategoryDto[]> {
    return this.http.get(this.path).pipe(mergeMap((data: any) => of(data.map((item: any) => new CategoryDto().fromJS(item)))));
  }

}

export class CategoryDto {
  id?: string;
  slug!: string;
  icon!: string;
  name!: string;

  init(data: any): void {
    if (data) {
      this.id = data.id;
      this.slug = data.slug;
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