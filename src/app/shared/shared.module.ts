import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { AppService } from './api/app.service';
import { RecordService } from './api/record.service';
import { TaskService } from './api/task.service';
import { JobService } from './api/job.service';
import { KeyValueComponent } from './component/key-value/key-value.component';
import { DatetimePipe } from './pipe/datetime.pipe';
import { OrderByPipe } from './pipe/order-by.pipe';
import { ClipboardCopyService } from './service/clipboard-copy.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    KeyValueComponent,
    DatetimePipe,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AppService,
    RecordService,
    TaskService,
    JobService,
    ClipboardCopyService
  ],
  exports: [
    KeyValueComponent,
    DatetimePipe,
    OrderByPipe
  ]
})
export class SharedModule {
}
