import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './shared/api/app.service';
import { RecordService } from './shared/api/record.service';
import { TaskService } from './shared/api/task.service';
import { JobService } from './shared/api/job.service';
import { LayoutModule } from './layout/layout.module';
import { FormsModule } from '@angular/forms';
import { AboutModule } from './about/about.module';
import { AboutService } from './shared/api/about.service';
import { SharedModule } from './shared/shared.module';
import { ThemeService } from './layout/theme/theme.service';
import { StreamsModule } from './streams/streams.module';
import { TasksJobsModule } from './tasks-jobs/tasks-jobs.module';
import { ManageModule } from './manage/manage.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    SharedModule,
    AboutModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    StreamsModule,
    TasksJobsModule,
    ManageModule
  ],
  providers: [
    AppService,
    RecordService,
    TaskService,
    JobService,
    ThemeService,
    {
      provide: APP_INITIALIZER,
      useFactory: (aboutService: AboutService) => {
        return () => {
          return aboutService.load().toPromise();
          // return authService.loadSecurityInfo(true)
          //   .pipe(
          //     map(securityInfo => {
          //       if (securityInfo.isAuthenticated || !securityInfo.isAuthenticationEnabled) {
          //         sharedAboutService.loadAboutInfo();
          //       }
          //     })
          //   ).toPromise();
        };
      },
      deps: [AboutService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
