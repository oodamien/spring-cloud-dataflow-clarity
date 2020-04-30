import { Component, OnInit, ViewChild } from '@angular/core';
import { JobExecution } from '../../../shared/model/job.model';
import { mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../shared/api/job.service';
import { ConfirmComponent } from '../../../shared/component/confirm/confirm.component';
import { NotificationService } from '../../../shared/service/notification.service';
import { HttpError } from '../../../shared/model/error.model';

@Component({
  selector: 'app-job-execution',
  templateUrl: './execution.component.html',
  styles: []
})
export class ExecutionComponent implements OnInit {

  loading = true;
  execution: JobExecution;
  @ViewChild('restartModal', { static: true }) restartModal: ConfirmComponent;
  @ViewChild('stopModal', { static: true }) stopModal: ConfirmComponent;

  constructor(private route: ActivatedRoute,
              private jobService: JobService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap(
          val => {
            this.execution = new JobExecution();
            this.execution.jobExecutionId = val.executionId;
            return this.jobService.getExecution(val.executionId);
          }
        ),
      )
      .subscribe((execution: JobExecution) => {
        this.execution = execution;
        this.loading = false;
      }, (error) => {
        this.notificationService.error('An error occurred', error);
        if (HttpError.is404(error)) {
          this.router.navigateByUrl('/tasks-jobs/job-executions');
        }
      });
  }

  restart() {
    this.restartModal.open();
  }

  restartJob() {
    this.jobService.restart(this.execution)
      .subscribe(() => {
        this.notificationService.success('Restart job', `Successfully restarted job "${this.execution.name}"`);
      }, error => {
        this.notificationService.error('An error occurred', error);
      });
  }

  stop() {
    this.stopModal.open();
  }

  stopJob() {
    this.jobService.stop(this.execution)
      .subscribe(() => {
        this.notificationService.success('Stop job', `Successfully stopped job "${this.execution.name}"`);
      }, error => {
        this.notificationService.error('An error occurred', error);
      });
  }

}
