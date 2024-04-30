import { Component, Input, inject, signal } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { IonSpinner } from "@ionic/angular/standalone";
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { TitleModalComponent } from '@shared/components/title-modal/title-modal.component';
import { ViewComponent } from 'pc-core';
import { CategoriesProxy, CategoryDto, onFileChange } from 'pc-proxies';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-category-image',
  standalone: true,
  imports: [IonSpinner, TitleModalComponent, ImageUploaderComponent,],
  templateUrl: './edit-category-image.component.html',
  styleUrls: ['./edit-category-image.component.scss']
})
export class EditCategoryImageComponent extends ViewComponent {

  private readonly _categoriesProxy = inject(CategoriesProxy);

  @Input() id!: string;
  @Input() category!: CategoryDto;

  busy: boolean = false;
  icon = signal<File | undefined>(undefined);

  onUpdateIcon(): void {
    if (!this.icon()) return;

    this.busy = true;
    const storage = getStorage();
    const splited = this.category.icon.split('/');
    const name = splited.pop()?.split('?')[0].replace('%2F', '/');
    const storageRef = ref(storage, name);

    uploadBytes(storageRef, this.icon()!)
      .then(async (res) => {
        const url = await getDownloadURL(res.ref);
        this._categoriesProxy.updateIcon(
          this.id,
          url
        ).pipe(finalize(() => this.busy = false))
          .subscribe({
            next: (category) => {
              this.dialog.dismiss(category);
            }
          });
      });
  }

  onChange(event: File): void {
    this.icon.set(onFileChange(event));
  }
}
