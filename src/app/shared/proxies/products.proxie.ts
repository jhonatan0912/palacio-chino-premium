import { Injectable, inject } from '@angular/core';
import { AppHttpService } from '@core/index';
import { environment } from '@enviroments/environment.development';
import { Observable, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsProxy {

  private http = inject(AppHttpService);

  get path(): string {
    return `${environment.api}/api/v1/products`;
  }

  create(image: File, name: string, price: number, description: string): Observable<ProductDto> {
    const form = new FormData();
    form.append('image', image);
    form.append('name', name);
    form.append('price', price.toString());
    form.append('description', description);

    return this.http.post(this.path, form).pipe(mergeMap((data: any) => of(new ProductDto().fromJS(data))));
  };

  get(id: string): Observable<ProductDto> {
    return this.http.get(`${this.path}/${id}`).pipe(mergeMap((data: any) => of(new ProductDto().fromJS(data))));
  }

  getAll(): Observable<ProductDto[]> {
    return this.http.get(this.path).pipe(mergeMap((data: any) => of(data.map((item: any) => new ProductDto().fromJS(item)))));
  }

  delete(id: string): Observable<void> {
    const url = `${this.path}/${id}`;

    return this.http.delete(url);
  }
}

export class ProductDto {
  id?: string;
  name!: string;
  price!: number;
  description!: string;

  init(data: any): void {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.price = data.price;
      this.description = data.description;
    }
  }

  fromJS(data: any): ProductDto {
    data = typeof data === 'object' ? data : {};
    const result = new ProductDto();
    result.init(data);
    return result;
  }
}