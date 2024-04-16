import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText',
  standalone: true,
})
export class SliceTextPipe implements PipeTransform {

  transform(text: string, length: number): string {
    return text.length > length ? text.slice(0, length) + '...' : text;
  }

}
