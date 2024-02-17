import { AppNavigationService } from './services/navigation.service';
import { AppSessionService } from './services/session.service';

export abstract class ViewComponent {

  navigation: AppNavigationService;
  session: AppSessionService;

  constructor() {
    this.navigation = new AppNavigationService();
    this.session = new AppSessionService();
  }
}