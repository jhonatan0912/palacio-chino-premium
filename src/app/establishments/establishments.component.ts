import { Component, OnInit, inject } from '@angular/core';
import { StoreMapComponent } from '@shared/components/store-map/store-map.component';
import { IonSkeletonText } from "@ionic/angular/standalone";
import { ViewComponent } from 'pc-core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-establishments',
  standalone: true,
  imports: [IonSkeletonText, StoreMapComponent],
  templateUrl: './establishments.component.html',
  styleUrl: './establishments.component.scss'
})
export class EstablishmentsComponent extends ViewComponent implements OnInit {

  private readonly _title = inject(Title);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this._title.setTitle('Local');
  }

  onHome(): void {
    this.navigation.forward('/');
  }
}
