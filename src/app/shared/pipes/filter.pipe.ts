import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term: string): any[] {
    if (!term) return items;
    return items.filter(item => item.name.toLowerCase().includes(term.toLowerCase()));
  }
}
