import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slug',
  standalone: true,
})
export class SlugPipe implements PipeTransform {

  transform(name: string): string {
    return name.toLocaleLowerCase().split(' ').join('-');
  }

}
