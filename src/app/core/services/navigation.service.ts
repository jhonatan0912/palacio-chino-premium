import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {

  private router = inject(Router);

  constructor() { }

  forward(path: string) {
    this.router.navigateByUrl(path);
  }
}
