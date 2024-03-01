import { Component, ElementRef, EventEmitter, Output, ViewChild, signal } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'image-uploader',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {

  @ViewChild('file') file!: ElementRef<HTMLIonInputElement>;

  preview = signal<string>('/assets/empty-image.png');

  @Output() onChange = new EventEmitter<File>();

  openFileInput(): void {
    this.file.nativeElement.click();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.preview.set(URL.createObjectURL(file));
    this.onChange.emit(file);
  }

}
