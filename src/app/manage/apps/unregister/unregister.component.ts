import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { App } from '../../../shared/model/app.model';
import { AppService } from '../../../shared/api/app.service';

@Component({
  selector: 'app-unregister',
  templateUrl: './unregister.component.html'
})
export class UnregisterComponent {

  apps: App[];
  isOpen = false;
  @Output() onUnregistered = new EventEmitter();

  constructor(private appsService: AppService) {
  }

  open(apps: App[]) {
    this.apps = apps;
    this.isOpen = true;
  }

  unregister() {
    this.appsService.unregisterApps(this.apps)
      .subscribe(
        data => {
          if (data.length === 1) {
            // this.notificationService.success('Successfully removed app "'
            //   + this.applications[0].name + '" of type "' + this.applications[0].type.toString() + '".');
          } else {
            // this.notificationService.success(`${data.length} app(s) unregistered.`);
          }
          this.onUnregistered.emit(data);
          this.isOpen = false;
          this.apps = null;
        }, error => {
          // this.notificationService.error(AppError.is(error) ? error.getMessage() : error);
          this.isOpen = false;
          this.apps = null;
        });
  }

}
