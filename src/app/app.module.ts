import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StreamsModule } from './streams/streams.module';
import { TasksJobsModule } from './tasks-jobs/tasks-jobs.module';
import { ManageModule } from './manage/manage.module';
import { AppService } from './shared/api/app.service';
import { RecordService } from './shared/api/record.service';
import { TaskService } from './shared/api/task.service';
import { JobService } from './shared/api/job.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    StreamsModule,
    TasksJobsModule,
    ManageModule,
    HttpClientModule,
  ],
  providers: [
    AppService,
    RecordService,
    TaskService,
    JobService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
