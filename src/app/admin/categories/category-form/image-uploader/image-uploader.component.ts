import { Component, EventEmitter, Output, model, signal } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'image-uploader',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {

  preview = signal<string>('');

  @Output() onChange = new EventEmitter<File>();

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.preview.set(URL.createObjectURL(file));
    this.onChange.emit(file);
  }

}
