import { inject } from '@angular/core';
import { AppDialogService } from './services/dialog.service';
import { AppNavigationService } from './services/navigation.service';
import { AppPopoverService } from './services/popover.service';
import { AppScreenService } from './services/screen.service';
import { AppSessionService } from './services/session.service';

export abstract class ViewComponent {
  dialog = inject(AppDialogService);
  navigation = inject(AppNavigationService);
  popup = inject(AppPopoverService);
  screen = inject(AppScreenService);
  session = inject(AppSessionService);
}