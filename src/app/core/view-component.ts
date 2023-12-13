import { NavigationService } from './services/navigation.service';

export abstract class ViewComponent {

  router: NavigationService;

  constructor() {
    this.router = new NavigationService();
  }
}