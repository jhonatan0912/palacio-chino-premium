import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[imageBroken]',
  standalone: true,
})
export class ImageBrokenDirective {

  @HostListener('error', ['$event'])
  onImageError(event: any) {
    event.target.src = 'https://static.thenounproject.com/png/2932881-200.png';
  }
}
