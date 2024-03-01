import { Injectable, inject } from '@angular/core';
import { AppHttpService } from '@core/services/http.service';
import { environment } from '@enviroments/environment.development';
import { Observable, mergeMap, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesProxy {

  private http = inject(AppHttpService);

  get path(): string {
    return `${environment.api}/api/v1/categories`;
  }

  create(icon: File, name: string, slug: string): Observable<CategoryDto> {
    const form = new FormData();
    form.append('icon', icon);
    form.append('name', name);
    form.append('slug', slug);

    return this.http.post(this.path, form).pipe(mergeMap((data: any) => of(new CategoryDto().fromJS(data))));
  }

  get(id: string): Observable<CategoryDto> {
    return this.http.get(`${this.path}/${id}`).pipe(mergeMap((data: any) => of(new CategoryDto().fromJS(data))));
  }

  getAll(): Observable<CategoryDto[]> {
    return this.http.get(this.path).pipe(mergeMap((data: any) => of(data.map((item: any) => new CategoryDto().fromJS(item)))));
  }

  delete(id: string): Observable<void> {
    const url = `${this.path}/${id}`;

    return this.http.delete(url);
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

export const getSlug = (name: string): string => {
  return name.toLowerCase().split(' ').join('-');
};

export const onFileChange = (event: any): File | undefined => {
  debugger;
  console.log(event);
  if (event.target.files === 0) return;

  return event.target.files[0];
};