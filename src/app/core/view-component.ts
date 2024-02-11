import { AppNavigationService } from './services/navigation.service';

export abstract class ViewComponent {

  router: AppNavigationService;

  constructor() {
    this.router = new AppNavigationService();
  }
}