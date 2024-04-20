import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'galery',
  standalone: true,
  imports: [],
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss']
})
export class GaleryComponent implements OnInit {

  private readonly _title = inject(Title);

  ngOnInit(): void {
    this._title.setTitle('Galería');
  }
}
