import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CategoryFormValues {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  categoryForm: CategoryFormValues = {
    icon: '',
    name: '',
  };

  constructor() { }

  ngOnInit() { }

  get categoryCode(): string {
    return this.categoryForm.name.toLowerCase().split(' ').join('-');
  }


  addCategory(): void {
    
  }
}
