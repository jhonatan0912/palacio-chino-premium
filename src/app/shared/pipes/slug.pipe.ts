import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slug',
  standalone: true,
})
export class SlugPipe implements PipeTransform {

  transform(name: string): any {
    return name.toLocaleLowerCase().split(' ').join('-');
  }

}
