import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checked',
  standalone: true
})
export class CheckedPipe implements PipeTransform {

  transform(categories: any[], categoryId: string): boolean {
    return categories.some(category => category.id === categoryId);
  }

}
