import { Injectable, signal } from '@angular/core';
import { AddressDto } from '@shared/proxies/addresses.proxies';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  loaded = signal<boolean>(false);

  addresses = signal<AddressDto[]>([]);

}
