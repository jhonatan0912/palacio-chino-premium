import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { TitleModalComponent } from '@shared/components/title-modal/title-modal.component';
import { CategoriesProxy, onFileChange } from '@shared/proxies';
import { finalize } from 'rxjs';
import { IonSpinner } from "@ionic/angular/standalone";

@Component({
  selector: 'edit-category-image',
  standalone: true,
  imports: [IonSpinner, TitleModalComponent, ImageUploaderComponent,],
  templateUrl: './edit-category-image.component.html',
  styleUrls: ['./edit-category-image.component.scss']
})
export class EditCategoryImageComponent extends ViewComponent implements OnInit {

  private readonly _categoriesProxy = inject(CategoriesProxy);

  @Input() id!: string;

  busy: boolean = false;
  icon = signal<File | undefined>(undefined);

  constructor() {
    super();
  }

  ngOnInit() {
    console.log({ id: this.id });
  }

  onUpdateIcon(): void {
    if (!this.icon()) return;

    this.busy = true;
    this._categoriesProxy.updateIcon(
      this.id,
      this.icon()
    ).pipe(finalize(() => this.busy = false))
      .subscribe({
        next: (category) => {
          this.dialog.dismiss(category);
        }
      });
  }

  onChange(event: File): void {
    this.icon.set(onFileChange(event));
  }
}
