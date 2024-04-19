import { Injectable, signal } from '@angular/core';
import { CategoryDto } from 'pc-proxies';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories = signal<CategoryDto[]>([]);

  onCategory: Subject<CategoryDto> = new Subject<CategoryDto>();
}
