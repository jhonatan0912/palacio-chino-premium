import { inject } from '@angular/core';
import { AppNavigationService } from './services/navigation.service';
import { AppSessionService } from './services/session.service';

export abstract class ViewComponent {

  navigation = inject(AppNavigationService);
  session = inject(AppSessionService);
}