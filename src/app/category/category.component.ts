import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  @Input({ required: true }) name: string = 'awdaw';

  constructor() { }

  ngOnInit() { }

}
