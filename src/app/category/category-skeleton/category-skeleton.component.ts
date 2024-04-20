import { Component } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';

@Component({
  selector: 'category-skeleton',
  standalone: true,
  imports: [IonSkeletonText, IonSkeletonText],
  templateUrl: './category-skeleton.component.html',
  styleUrls: ['./category-skeleton.component.scss']
})
export class CategorySkeletonComponent { }
