import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { KeyValueComponent } from './component/key-value/key-value.component';
import { DatetimePipe } from './pipe/datetime.pipe';
import { OrderByPipe } from './pipe/order-by.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DurationPipe } from './pipe/duration.pipe';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastComponent } from './component/toast/toast.component';
import { SearchComponent } from './component/search/search.component';

@NgModule({
  entryComponents: [
    ToastComponent
  ],
  declarations: [
    KeyValueComponent,
    DatetimePipe,
    OrderByPipe,
    DurationPipe,
    ConfirmComponent,
    ToastComponent,
    ToastComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      tapToDismiss: false,
      preventDuplicates: false,
      maxOpened: 6,
      enableHtml: true,
      closeButton: true,
      toastComponent: ToastComponent
    })
  ],
  exports: [
    KeyValueComponent,
    ConfirmComponent,
    DatetimePipe,
    OrderByPipe,
    DurationPipe,
    SearchComponent
  ]
})
export class SharedModule {
}
