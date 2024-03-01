import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ButtonComponent } from '@lib/button/button.component';
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { onFileChange } from '@shared/proxies/categories.proxies';

@Component({
  selector: 'products-form',
  standalone: true,
  imports: [ButtonComponent, ImageUploaderComponent],
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {

  image: File | undefined;

  constructor() { }

  ngOnInit() { }

  onFileChange(event: any) {
    this.image = onFileChange(event);
  };

}
