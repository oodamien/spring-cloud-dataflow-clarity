import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../shared/api/job.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY, forkJoin } from 'rxjs';
import { ExecutionStepProgress, ExecutionStepResource, JobExecution } from '../../../shared/model/job.model';
import { NotificationService } from '../../../shared/service/notification.service';
import { HttpError } from '../../../shared/model/error.model';

@Component({
  selector: 'app-execution-step',
  templateUrl: './step.component.html'
})
export class StepComponent implements OnInit {

  loading = true;
  execution: JobExecution;
  stepResource: ExecutionStepResource;
  stepProgress: ExecutionStepProgress;

  constructor(private route: ActivatedRoute,
              private jobService: JobService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.route.params
      .pipe(mergeMap(
        params => forkJoin([
          this.jobService.getExecution(params.executionId),
          this.jobService.getExecutionStep(params.executionId, params.stepId),
          this.jobService.getExecutionStepProgress(params.executionId, params.stepId)
        ]).pipe(
          map((results) => {
            // this.jobId = val.jobid;
            return {
              execution: results[0],
              step: results[1],
              stepProgress: results[2]
            };
          }))
        )
      )
      .subscribe((details) => {
        this.execution = details.execution;
        this.stepResource = details.step;
        this.stepProgress = details.stepProgress;
        this.loading = false;
      }, (error) => {
        this.notificationService.error('An error occurred', error);
        if (HttpError.is404(error)) {
          this.router.navigateByUrl('/tasks-jobs/job-executions');
        }
      });
  }

}
