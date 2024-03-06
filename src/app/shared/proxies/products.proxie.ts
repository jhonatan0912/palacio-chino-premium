import { Injectable, inject } from '@angular/core';
import { AppHttpService } from '@core/index';
import { Observable, mergeMap, of } from 'rxjs';
import { CategoryDto } from './categories.proxies';
import { environment } from '@environments/environment';

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
    const url = `${this.path}/${id}`;
    return this.http.get(url).pipe(mergeMap((data: any) => of(new ProductDto().fromJS(data))));
  }

  getAll(limit: number = 0, offset: number = 10): Observable<GetAllProductsResponseDto> {
    let url = this.path;
    if (limit !== null && limit !== undefined)
      url += `?limit=${limit}`;

    if (offset !== null && offset !== undefined)
      url += `&offset=${offset}`;

    return this.http.get(url).pipe(mergeMap((data: any) => of(new GetAllProductsResponseDto().fromJS(data))));
  }

  getPromotions(limit: number = 0, offset: number = 10): Observable<GetAllProductsResponseDto> {
    let url = `${this.path}/promotions`;
    if (limit !== null && limit !== undefined)
      url += `?limit=${limit}`;

    if (offset !== null && offset !== undefined)
      url += `&offset=${offset}`;

    return this.http.get(url).pipe(mergeMap((data: any) => of(new GetAllProductsResponseDto().fromJS(data))));

  }

  getByCategory(idCategory: string, page: number = 1, pageSize: number = 10): Observable<ProductDto[]> {
    let url = `${this.path}/getByCategory/${idCategory}`;
    if (page !== null && page !== undefined)
      url += `?page=${page}`;

    if (pageSize !== null && pageSize !== undefined)
      url += `&pageSize=${pageSize}`;

    return this.http.get(url).pipe(mergeMap((data: any) => of(data.map((item: any) => new ProductDto().fromJS(item)))));
  }

  update(id: string, categoryId: string | null, image: string, name: string, price: number, description: string): Observable<void> {
    const url = `${this.path}/${id}`;
    const body = {
      categoryId,
      image,
      name,
      price,
      description
    };
    return this.http.update(url, body);
  }

  delete(id: string): Observable<void> {
    const url = `${this.path}/${id}`;

    return this.http.delete(url);
  }
}

export class GetAllProductsResponseDto {
  meta!: GetAllProductsResponseMetaDto;
  products!: ProductDto[];

  init(data: any): void {
    if (data) {
      this.meta = data.meta ? new GetAllProductsResponseMetaDto().fromJS(data.meta) : <any>undefined;
      this.products = data.products ? data.products.map((item: any) => new ProductDto().fromJS(item)) : [];
    }
  }

  fromJS(data: any): GetAllProductsResponseDto {
    data = typeof data === 'object' ? data : {};
    const result = new GetAllProductsResponseDto();
    result.init(data);
    return result;
  }
}

export class GetAllProductsResponseMetaDto {
  limit!: number;
  offset!: number;
  total!: number;

  init(data: any): void {
    if (data) {
      this.limit = data.limit;
      this.offset = data.offset;
      this.total = data.total;
    }
  }

  fromJS(data: any): GetAllProductsResponseMetaDto {
    data = typeof data === 'object' ? data : {};
    const result = new GetAllProductsResponseMetaDto();
    result.init(data);
    return result;
  }
}

export class ProductDto {
  id?: string;
  image!: string;
  name!: string;
  price!: number;
  description!: string;
  categories!: CategoryDto[];
  quantity?: number | undefined;

  init(data: any): void {
    if (data) {
      this.id = data.id;
      this.image = data.image;
      this.name = data.name;
      this.price = data.price;
      this.description = data.description;

      this.categories = [];

      if (Array.isArray(data.categories)) {
        for (const item of data.categories) {
          this.categories.push(new CategoryDto().fromJS(item));
        }
      }
    }
  }

  fromJS(data: any): ProductDto {
    data = typeof data === 'object' ? data : {};
    const result = new ProductDto();
    result.init(data);
    return result;
  }
}