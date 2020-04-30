import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../shared/api/task.service';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Router } from '@angular/router';
import { TaskExecution, TaskExecutionPage } from '../../shared/model/task-execution.model';
import { StopComponent } from './stop/stop.component';
import { CleanupComponent } from './cleanup/cleanup.component';

@Component({
  selector: 'app-executions',
  templateUrl: './executions.component.html',
})
export class ExecutionsComponent {

  loading = true;
  page: TaskExecutionPage;
  selected = [];
  grouped = false;
  state: ClrDatagridStateInterface;
  @ViewChild('stopModal', { static: true }) stopModal: StopComponent;
  @ViewChild('cleanModal', { static: true }) cleanModal: CleanupComponent;

  constructor(private taskService: TaskService,
              private router: Router) {
  }

  refresh(state: ClrDatagridStateInterface) {
    this.state = state;
    this.loading = true;
    this.grouped = false;
    const filters: { [prop: string]: any } = {};
    if (this.state.filters) {
      for (const filter of this.state.filters) {
        const { property, value } = filter;
        filters[property] = value;
      }
    }
    this.taskService.getExecutions(this.state.page.current - 1, this.state.page.size, filters?.taskName || '',
      `${this.state?.sort?.by || ''}`, `${this.state?.sort?.reverse ? 'DESC' : 'ASC'}`)
      .subscribe((page: TaskExecutionPage) => {
        this.page = page;
        this.selected = [];
        this.loading = false;
      });
  }

  details(execution: TaskExecution) {
    this.router.navigateByUrl(`tasks-jobs/task-executions/${execution.executionId}`);
  }

  taskDetails(execution: TaskExecution) {
    this.router.navigateByUrl(`tasks-jobs/tasks/${execution.taskName}`);
  }

  relaunch(execution: TaskExecution) {
    this.router.navigateByUrl(`tasks-jobs/tasks/${execution.taskName}/launch`);
  }

  stop(execution: TaskExecution) {
    this.stopModal.open(execution);
  }

  setMode(grouped: boolean) {
    this.grouped = grouped;
    this.selected = [];
  }

  cleanup(executions: TaskExecution[]) {
    this.cleanModal.open(executions);
  }

}
