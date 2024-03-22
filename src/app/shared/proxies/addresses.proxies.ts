import { Injectable, inject } from '@angular/core';
import { AppHttpService } from '@core/index';
import { environment } from '@environments/environment';
import { Observable, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressesProxy {

  private http = inject(AppHttpService);

  get path(): string {
    return `${environment.api}/api/v1/addresses`;
  }

  create(district: string, type: string, street: string, number: string, phone: string, reference: string): Observable<CreateAddressResponseDto> {
    const body = {
      district,
      type,
      street,
      number,
      phone,
      reference,
    };

    return this.http.post(this.path, body).pipe(mergeMap((data: any) => of(new CreateAddressResponseDto().fromJS(data))));
  }

  getAll(): Observable<AddressDto[]> {
    return this.http.get(this.path).pipe(mergeMap((data: any) => of(data.map((item: any) => new AddressDto().fromJS(item)))));
  }

  delete(id: string): Observable<DeleteResponseDto> {
    let url = `${this.path}/${id}`;
    return this.http.delete(url).pipe(mergeMap((data: any) => of(new DeleteResponseDto().fromJS(data))));
  }
}

export class AddressDto {
  id?: string;
  district!: string;
  type!: string;
  street!: string;
  number!: string;
  phone!: string;
  reference!: string;

  init(data: any): void {
    if (data) {
      this.id = data.id ? data.id : <any>undefined;
      this.district = data.district;
      this.type = data.type;
      this.street = data.street;
      this.number = data.number;
      this.phone = data.phone;
      this.reference = data.reference;
    }
  }

  fromJS(data: any): AddressDto {
    data = typeof data === 'object' ? data : {};
    const result = new AddressDto();
    result.init(data);
    return result;
  }
}

export class CreateAddressResponseDto {
  data!: AddressDto;

  init(data: any): void {
    if (data) {
      this.data = data.data ? new AddressDto().fromJS(data.data) : <any>undefined;
    }
  }

  fromJS(data: any): CreateAddressResponseDto {
    data = typeof data === 'object' ? data : {};
    const result = new CreateAddressResponseDto();
    result.init(data);
    return result;
  }
}

export class DeleteResponseDto {
  id!: string;
  msg!: string;

  init(data: any): void {
    if (data) {
      this.id = data.id;
      this.msg = data.msg;
    }
  };

  fromJS(data: any): DeleteResponseDto {
    data = typeof data === 'object' ? data : {};
    const result = new DeleteResponseDto();
    result.init(data);
    return result;
  }
}