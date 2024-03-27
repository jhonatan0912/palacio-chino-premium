import { inject } from '@angular/core';
import { AppAlertService, AppDialogService, AppLocalizationService, AppNavigationService, AppNotifyService, AppPopoverService, AppScreenService, AppSessionService, AppTabService, AppThemeService } from '@core/index';


export abstract class ViewComponent {
  alert = inject(AppAlertService);
  dialog = inject(AppDialogService);
  navigation = inject(AppNavigationService);
  popup = inject(AppPopoverService);
  screen = inject(AppScreenService);
  session = inject(AppSessionService);
  toolbar = inject(AppTabService);
  notify = inject(AppNotifyService);
  localization = inject(AppLocalizationService);
  theme = inject(AppThemeService);
}