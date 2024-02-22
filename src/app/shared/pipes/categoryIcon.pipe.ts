import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@enviroments/environment.development';

@Pipe({
  name: 'categoryIcon',
  standalone: true
})
export class CategoryIconPipe implements PipeTransform {

  transform(iconPath: string): string {
    return `${environment.api}/${iconPath}`;
  }

}
