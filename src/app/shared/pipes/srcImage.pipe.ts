import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@enviroments/environment.development';

@Pipe({
  name: 'srcImage',
  standalone: true,
})
export class SrcImagePipe implements PipeTransform {

  transform(path: string): string {
    return `${environment.api}/${path}`;
  }

}
