import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { App, ApplicationType } from '../../shared/model/app.model';

@Component({
  selector: 'app-clr-datagrid-type-filter',
  template: `
    <div>
      <clr-radio-wrapper>
        <input type="radio" clrRadio (change)="change()" [(ngModel)]="val" value="all" name="options"/>
        <label>All type</label>
      </clr-radio-wrapper>
      <clr-radio-wrapper>
        <input type="radio" clrRadio (change)="change()" [(ngModel)]="val" value="source" name="options"/>
        <label>Source</label>
      </clr-radio-wrapper>
      <clr-radio-wrapper>
        <input type="radio" clrRadio (change)="change()" [(ngModel)]="val" value="processor" name="options"/>
        <label>Processor</label>
      </clr-radio-wrapper>
      <clr-radio-wrapper>
        <input type="radio" clrRadio (change)="change()" [(ngModel)]="val" value="sink" name="options"/>
        <label>Sink</label>
      </clr-radio-wrapper>
      <clr-radio-wrapper>
        <input type="radio" clrRadio (change)="change()" [(ngModel)]="val" value="app" name="options"/>
        <label>App</label>
      </clr-radio-wrapper>
    </div>`,
})
export class TypeFilterComponent {

  property = 'type';
  value = null;
  val = 'all'

  private pchanges = new Subject<any>();

  public get changes(): Observable<any> {
    return this.pchanges.asObservable();
  }

  change() {
    if (this.val === 'all') {
      this.value = null;
    } else {
      this.value = (this.val as any) as ApplicationType;
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
