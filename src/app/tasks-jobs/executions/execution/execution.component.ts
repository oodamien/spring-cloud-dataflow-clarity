import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskExecution } from '../../../shared/model/task-execution.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../shared/api/task.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { StopComponent } from '../stop/stop.component';
import { CleanupComponent } from '../cleanup/cleanup.component';
import { NotificationService } from '../../../shared/service/notification.service';
import { HttpError } from '../../../shared/model/error.model';

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html'
})
export class ExecutionComponent implements OnInit {

  loading = true;
  execution: TaskExecution;
  logs: string;
  @ViewChild('stopModal', { static: true }) stopModal: StopComponent;
  @ViewChild('cleanModal', { static: true }) cleanModal: CleanupComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskService: TaskService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap(
          (params) => {
            this.execution = new TaskExecution();
            this.execution.executionId = params.executionId;
            return this.taskService.getExecution(params.executionId);
          }
        ),
        mergeMap(
          (execution: TaskExecution) => {
            if (execution.taskExecutionStatus === 'COMPLETE' || execution.taskExecutionStatus === 'ERROR') {
              return this.taskService.getExecutionLogs(execution).pipe(
                map(logs => {
                  return {
                    execution,
                    logs
                  };
                })
              );
            } else {
              return of({
                execution,
                logs: null
              });
            }
          }
        )
      )
      .subscribe(({ execution, logs }) => {
        this.execution = execution;
        this.logs = logs;
        this.loading = false;
      }, (error) => {
        this.notificationService.error('An error occurred', error);
        if (HttpError.is404(error)) {
          this.router.navigateByUrl('/tasks-jobs/task-executions');
        }
      });
  }

  task() {
    this.router.navigateByUrl(`/tasks-jobs/tasks/${this.execution.taskName}`);
  }

  relaunch() {
    this.router.navigateByUrl(`/tasks-jobs/tasks/${this.execution.taskName}/launch`);
  }

  stop() {
    this.stopModal.open(this.execution);
  }

  cleanup() {
    this.cleanModal.open([this.execution]);
  }

  back() {
    this.router.navigateByUrl(`/tasks-jobs/task-executions`);
  }

}
