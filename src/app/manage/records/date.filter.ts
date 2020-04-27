import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { App } from '../../shared/model/app.model';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-clr-datagrid-date-filter',
  template: `
    <div>
      <div class="alert alert-danger" role="alert" *ngIf="invalid">
        <div class="alert-items">
          <div class="alert-item static">
            <div class="alert-icon-wrapper">
              <clr-icon class="alert-icon" shape="exclamation-circle"></clr-icon>
            </div>
            <span class="alert-text">
                Invalid dates.
            </span>
          </div>
        </div>
      </div>
      <clr-input-container>
        <label>Min date:</label>
        <input clrInput type="text" (change)="change()" placeholder="YYYY-MM-DD" [(ngModel)]="min">
      </clr-input-container>
      <clr-input-container>
        <label>Max date:</label>
        <input clrInput type="text" (change)="change()" placeholder="YYYY-MM-DD" [(ngModel)]="max">
      </clr-input-container>
    </div>`,
})
export class DateFilterComponent {

  private pchanges = new Subject<any>();

  property = 'dates';

  value = null;

  min = null;

  max = null;

  invalid = false;

  public get changes(): Observable<any> {
    return this.pchanges.asObservable();
  }

  change() {
    this.invalid = false;
    this.value = null;
    if (this.min || this.max) {
      let date;
      let min = null;
      let max = null;
      if (this.min) {
        date = DateTime.fromFormat(this.min, 'y-MM-dd');
        if (!date.isValid) {
          this.invalid = true;
        } else {
          min = date;
        }
      }
      if (this.max) {
        date = DateTime.fromFormat(this.max, 'y-MM-dd');
        if (!date.isValid) {
          this.invalid = true;
        } else {
          max = date;
        }
      }
      if (this.min && this.max) {
        if (this.min > this.max) {
          this.invalid = true;
          min = null;
          max = null;
        }
      }
      this.value = [min, max];
    }
    this.pchanges.next(true);
  }

  accepts(application: App) {
    return true;
  }

  isActive(): boolean {
    return this.value !== null;
  }

}
