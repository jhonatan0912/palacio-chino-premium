import { Injectable } from '@angular/core';
import { CategoryDto } from '@shared/proxies/categories.proxies';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  onCategory: Subject<CategoryDto> = new Subject<CategoryDto>();
  
}
