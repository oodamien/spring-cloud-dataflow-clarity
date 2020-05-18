import { Component } from '@angular/core';
import { App, ApplicationType } from '../../../shared/model/app.model';
import { AppService } from '../../../shared/api/app.service';
import { NotificationService } from '../../../shared/service/notification.service';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html'
})
export class VersionComponent {

  isOpen = false;
  isRunning = false;
  loading = true;
  versions: App[];

  constructor(private appService: AppService,
              private notificationService: NotificationService) {
  }

  open(name: string, type: ApplicationType) {
    this.loading = true;
    this.isOpen = true;
    this.appService.getAppVersions(name, type)
      .subscribe((versions: App[]) => {
        this.versions = versions;
        this.loading = false;
      }, (error) => {
        this.notificationService.error('An error occurred', error);
        this.isOpen = false;
      });
  }

}
